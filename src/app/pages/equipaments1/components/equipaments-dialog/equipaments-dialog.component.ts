import { AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { SpecificationsModule } from 'src/app/pages/specifications/specifications.module';
import { Equipament } from 'src/app/shared/models/equipament';
import { EquipamentSpecifications } from 'src/app/shared/models/equipamentSpecifications';
import { Specification } from 'src/app/shared/models/specification';
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

    constructor(
      public dialogRef: MatDialogRef<EquipamentsDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private specificationService: SpecificationsService,
      private equipamentsService: EquipamentsService,
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
        equipamentSpecifications: this.formBuilder.array(arr)
      });
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
  }