import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Consumable } from 'src/app/shared/models/consumable';
import { Equipament } from 'src/app/shared/models/equipament';
import { EquipamentSpecifications } from 'src/app/shared/models/equipamentSpecifications';
import { ConsumablesService } from 'src/app/shared/services/consumables.service';
import { EquipamentsService } from 'src/app/shared/services/equipaments.service';
import { SpecificationsService } from 'src/app/shared/services/specifications.service';

@Component({
		selector: 'app-equipaments-dialog',
		templateUrl: 'equipaments-dialog.component.html',
		styleUrls: ['./equipaments-dialog.component.scss']
	})
	export class EquipamentsDialogComponent implements OnInit {
		form: FormGroup;
		isAddMode: boolean;
		id: string;
		list: EquipamentSpecifications[] = [];
		consumables: Consumable[] = [];
		consumableArray: [] = [];

		constructor(
			public dialogRef: MatDialogRef<EquipamentsDialogComponent>,
			@Inject(MAT_DIALOG_DATA) public data: any,
			private specificationService: SpecificationsService,
			private equipamentsService: EquipamentsService,
			private consumablesService: ConsumablesService,
			private formBuilder: FormBuilder,
			private toastr: ToastrService) {}

		async loadSpecifications(): Promise<void> {
			await this.specificationService.loadSpecifications().toPromise().then((data) => {
				localStorage.setItem('specificationsList',JSON.stringify(data));
			}); 
		}

		loadConsumables(): void {
			this.consumablesService.loadConsumables().subscribe((resp: Consumable[]) => {
				this.consumables = resp;
				this.createConsumableForms();
			}); 
		}

		createConsumableForms(): void {
			this.consumables.forEach(item => {
				const existingItem = this.data.element?.equipamentConsumables.find(e => e.consumableId === item.id);

				const formGroup = this.formBuilder.group({
					name: [{value: item.name, disabled: true}],
					active: [existingItem ? existingItem.active : item.active, Validators.required],
					value: [existingItem ? existingItem.value.toFixed(2).replace('.',',') : 0, Validators.required],
					equipamentId: [existingItem ? this.data.element.id : null],
					consumableId: [item.id],
					createdAt: existingItem ? existingItem.createdAt : new Date()
				});
		
				if (existingItem) {
					formGroup.addControl('id', new FormControl(existingItem.id));
				}
		
				this.equipamentConsumables.push(formGroup);
			});
		}

		ngOnInit(): void {
			this.createForm();
			this.loadSpecifications();
			this.loadConsumables();
			console.log(this.consumables);
			
		}

		public createForm(){
			let list = JSON.parse(localStorage.getItem('specificationsList'));
			let arr = [];
			this.id = this.data.element;
			this.isAddMode = !this.id;
			
			list.forEach(item => {
				let equipamentSpecification = {
					active: (this.isAddMode ? false : this.returnTrueOrFalse(item) ),
					specificationId: item.id,
					name: item.name
				} as EquipamentSpecifications;
				arr.push(this.buildEquipamentSpecifications(equipamentSpecification));
			});

			this.form = this.formBuilder.group({
				id:  [this.data.element?.id || ''],
				name: [this.data.element?.name || '', Validators.required],
				active: [this.data.element?.active || true, Validators.required],
				order: [this.data.element?.order || 0],
				createdAt: [this.data.element?.createdAt || new Date()],
				updatedAt: [this.data.element?.updatedsAt || null],
				equipamentSpecifications: this.formBuilder.array(arr),
				equipamentConsumables: this.formBuilder.array(this.consumableArray)
			});
		}

		get equipamentConsumables(): FormArray {
			return this.form.get('equipamentConsumables') as FormArray;
		}

		returnTrueOrFalse(value){
			let retorno = false;
			this.data.element?.equipamentSpecifications.forEach(item => {
				if (value.id === item.specificationId){
					retorno = item.active;
					return;
				}
			});
			
			return retorno;
		}

		buildEquipamentSpecifications(equipamentSpecification: EquipamentSpecifications){
			return this.formBuilder.group({
				specificationId: equipamentSpecification.specificationId,
				active: equipamentSpecification.active,
				name: equipamentSpecification.name
			});
		}

		onNoClick(): void {
			this.dialogRef.close();
		}

		onSubmit(){
			
			this.adjustFormValues();
			if (this.form.value.id === ""){
				this.equipamentsService.save(this.form.value).subscribe((resp: Equipament) => {
					this.toastr.success('Especificação adicionada.');
					this.dialogRef.close(resp);
				});
			} else {
				this.equipamentsService.update(this.form.value).subscribe((resp: Equipament) => {
					this.toastr.success('Especificação atualizada.');
					this.dialogRef.close(resp);
				});
			}
		}

		adjustFormValues(){
			this.equipamentConsumables.controls.forEach((control, index) => {
				const currentValue = control.get('value').value.toString();
				const newValue = currentValue.replace(',', '.');
				control.get('value').patchValue(newValue);
			  });
		}
	}