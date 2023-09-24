import { Component, Inject, OnInit, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Person } from '../../../../shared/models/person';
import { PersonService } from '../../../../shared/services/people.service';

@Component({
    selector: 'app-people-dialog',
    templateUrl: 'people-dialog.component.html',
    styleUrls: ['./people-dialog.component.scss']
  })
  export class PeopleDialogComponent implements OnInit{
    form: FormGroup;
    isAddMode: boolean;
    id: string;
    isDriver: boolean = true;
    isTechnique: boolean  = false;

    constructor(
      public dialogRef: MatDialogRef<PeopleDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private personService: PersonService,
      private formBuilder: FormBuilder,
      private toastr: ToastrService) {
        
    }

    ngOnInit(): void {
      this.id = this.data.element;
      this.isAddMode = !this.id;
      
      if (this.data.element?.personType === 'T')
        this.isDriver = false;

      this.form = this.formBuilder.group({
        id:  [this.data.element?.id || ''],
        name: [this.data.element?.name || '', Validators.required],
        cellPhone: [this.data.element?.cellPhone || '', Validators.required],
        plate: [this.data.element?.plate || '',[this.isDriver ? Validators.required : Validators.nullValidator]],
        active: [ this.isAddMode ? true : this.data.element?.active, Validators.required],
        personType: [this.isAddMode ? 'M' : this.data.element?.personType, Validators.required],
        createdAt: [this.data.element?.createdAt || new Date()],
        updatedAt: [this.data.element?.updatedsAt || null],
      });
      
      if (this.data.element?.personType === "T"){
        this.isDriver = false;
        this.isTechnique = true;
      }else{
        this.isDriver = true;
        this.isTechnique = false;
      }
     
    }
  
    onNoClick(): void {
      this.dialogRef.close();
    }

    radioChange(event: any){
      if (event.value === "T"){
        this.form.get('plate').clearValidators();
        this.isDriver = false;
        this.isTechnique = true;
      }else{
        this.form.get('plate').setValidators(Validators.required);
        this.isDriver = true;
        this.isTechnique = false;
      }
      this.form.get('plate').updateValueAndValidity();
    }

    onSubmit(){
      if (this.form.value.id === ""){
        this.personService.save(this.form.value).subscribe((resp: Person) => {
          if (this.isDriver){
            this.toastr.success('Motorista adicionado.');
          }else{
            this.toastr.success('Técnica adicionada.');
          }
          this.dialogRef.close(resp);
        });
      } else {
        this.personService.update(this.form.value).subscribe((resp: Person) => {
          if (this.isDriver){
           this.toastr.success('Motorista atualizado!');
          }else{
            this.toastr.success('Técnica atualizada!');
          }
          this.dialogRef.close(resp);
        });
      }
    }
  }