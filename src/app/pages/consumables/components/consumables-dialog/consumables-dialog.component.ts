import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Consumable } from 'src/app/shared/models/consumable';
import { Equipament } from 'src/app/shared/models/equipament';
import { EquipamentSpecifications } from 'src/app/shared/models/equipamentSpecifications';
import { ConsumablesService } from 'src/app/shared/services/consumables.service';
import { EquipamentsService } from 'src/app/shared/services/equipaments.service';
import { SpecificationsService } from 'src/app/shared/services/specifications.service';

@Component({
  selector: 'app-consumables-dialog',
  templateUrl: 'consumables-dialog.component.html',
  styleUrls: ['./consumables-dialog.component.scss']
})
export class ConsumablesDialogComponent implements OnInit {
  form: FormGroup;
  isAddMode: boolean;
  id: string;
  
  constructor(
    public dialogRef: MatDialogRef<ConsumablesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private specificationService: SpecificationsService,
    private consumablesService: ConsumablesService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService) {}
    
    async loadSpecifications(): Promise<void> {
      await this.specificationService.loadSpecifications().toPromise().then((data) => {
        localStorage.setItem('specificationsList',JSON.stringify(data));
      }); 
    }
    
    ngOnInit(): void {
      this.loadSpecifications();
      this.createForm();
    }
    
    public createForm(){
      this.id = this.data.element;
      this.isAddMode = !this.id;
      
      this.form = this.formBuilder.group({
        id:  [this.data.element?.id || ''],
        name: [this.data.element?.name || '', Validators.required],
        active: [ this.isAddMode ? true : this.data.element?.active, Validators.required],
        createdAt: [this.data.element?.createdAt || new Date()],
        updatedAt: [this.data.element?.updatedsAt || null],
      });
    }
    
    onNoClick(): void {
      this.dialogRef.close();
    }
    
    onSubmit(){
      if (this.form.value.id === ""){
        this.consumablesService.save(this.form.value).subscribe((resp: Consumable) => {
          this.toastr.success('Cosnumível adicionada.');
          this.dialogRef.close(resp);
        });
      } else {
        this.consumablesService.update(this.form.value).subscribe((resp: Consumable) => {
          this.toastr.success('Consumível atualizada.');
          this.dialogRef.close(resp);
        });
      }
    }
  }