import { Component, Inject, Input, OnChanges, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CalendarService } from 'src/app/shared/services/calendar.service';
import { ToastrService } from 'ngx-toastr';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MY_FORMATS } from 'src/app/consts/my-format';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { StickyNotesService } from 'src/app/shared/services/sticky-notes.service';

@Component({
    selector: 'app-sticky-notes-dialog',
    templateUrl: 'sticky-notes-dialog.component.html',
    styleUrls: ['./sticky-notes-dialog.component.scss'],
    providers: [
        {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
        {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
      ],
  })
  export class StickyNotesDialogComponent implements OnInit {
    form: FormGroup;
    selectedtype: any;
    todayDate;

    constructor(public dialogRef: MatDialogRef<StickyNotesDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private formBuilder: FormBuilder,
      private toastr: ToastrService,
      private stickyNotesService: StickyNotesService) {
        this.todayDate = new Date();
    }

    ngOnInit(): void {
        this.createForm();
        setTimeout(() => {
            this.ajusteCSS();
          },500); 
    }

    createForm(): void {
      this.form = this.formBuilder.group({
        active: true,
        createdAt: [this.data.element?.createdAt || new Date()],
        updatedAt: [this.data.element?.updatedsAt || null],
        id: [this.data.element?.id],  
        notes: [this.data.element?.notes || '', Validators.required],
        date: [this.data.element?.date || '', Validators.required]
      });      
    }

    onNoClick(): void {
      this.dialogRef.close();
    }

    onSubmit(): void {
        
        if (this.form.value.id === null){
            this.stickyNotesService.save(this.form.value).subscribe((resp) => {
                this.toastr.success('Anotação adicionada com sucesso');
                this.dialogRef.close(resp);
              }, (error: any) => {
                this.toastr.warning(error.error?.errorMessage)
              })
        }else{
            this.stickyNotesService.update(this.form.value).subscribe((resp) => {
                this.toastr.success('Anotação atualizada com sucesso');
                this.dialogRef.close(resp);
              }, (error: any) => {
                this.toastr.warning(error.error?.errorMessage)
              })
        }
      
      
    }

    ajusteCSS(): void {
        document.querySelectorAll<HTMLElement>('.mat-dialog-content')
        .forEach(el => el.setAttribute("style","height: 150px !important"));    
  
      }

  }