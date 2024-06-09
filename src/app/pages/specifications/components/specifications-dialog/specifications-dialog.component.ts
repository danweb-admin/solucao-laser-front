import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Specification } from 'src/app/shared/models/specification';
import { SpecificationsService } from 'src/app/shared/services/specifications.service';

@Component({
    selector: 'app-specifications-dialog',
    templateUrl: 'specifications-dialog.component.html',
    styleUrls: ['./specifications-dialog.component.scss']
  })
  export class SpecificationsDialogComponent implements OnInit, AfterViewInit {
    form: FormGroup;
    isAddMode: boolean;
    id: string;

    constructor(
      public dialogRef: MatDialogRef<SpecificationsDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private specificationService: SpecificationsService,
      private formBuilder: FormBuilder,
      private toastr: ToastrService) {
    }

    ngAfterViewInit(): void {
       
    }

    ngOnInit(): void {
      
      this.id = this.data.element;
      this.isAddMode = !this.id;
      
      this.form = this.formBuilder.group({
        id:  [this.data.element?.id || ''],
        name: [this.data.element?.name || '', Validators.required],
        active: [ this.isAddMode ? true : this.data.element?.active, Validators.required],
        single: [ this.data.element?.single || false],
        amount: [this.data.element?.amount || 1],
        hasConsumable: [this.data.element?.hasConsumable || false],
        value: [this.data.element?.value.toFixed(2).replace('.',',') || 0],
        createdAt: [this.data.element?.createdAt || new Date()],
        updatedAt: [this.data.element?.updatedsAt || null],
      });
      
    }

    onNoClick(): void {
      this.dialogRef.close();
    }

    onSubmit(){
      if (this.form.value.amount < 1){
        this.toastr.error("Quantidade não pode ser menor que 1");
        return;
      }

      if (this.form.value.id === ""){
        this.specificationService.save(this.form.value).subscribe((resp: Specification) => {
          this.toastr.success('Ponteira adicionada.');
          this.dialogRef.close(resp);
        },
        (err) => {
          this.toastr.error(err.error.errorMessage);
        });
      } else {
        this.specificationService.update(this.form.value).subscribe((resp: Specification) => {
          this.toastr.success('Ponteira atualizada.');
          this.dialogRef.close(resp);
        },
        (err) => {
          this.toastr.error(err.error.errorMessage);
        });
      }
    }
  }