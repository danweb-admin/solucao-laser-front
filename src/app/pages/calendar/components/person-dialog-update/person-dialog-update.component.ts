import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PersonService } from 'src/app/shared/services/people.service';
import { Person } from 'src/app/shared/models/person';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CalendarService } from 'src/app/shared/services/calendar.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-person-dialog-update',
    templateUrl: 'person-dialog-update.component.html',
    styleUrls: ['./person-dialog-update.component.scss']
  })
  export class PersonDialogUpdateComponent implements OnInit {
    form: FormGroup;
    isDriver: boolean;
    personResult: Person[];

    constructor(public dialogRef: MatDialogRef<PersonDialogUpdateComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private personService: PersonService,
      private formBuilder: FormBuilder,
      private toastr: ToastrService,
      private calendarService: CalendarService) {
      this.isDriver = data.isDriver;
    }

    ngOnInit(): void {
      this.personService.loadPeople(true).subscribe((resp: Person[]) => {
        if (this.isDriver){
          this.personResult = resp.filter(x => x.personType === 'M');
        }else{
          this.personResult = resp.filter(x => x.personType === 'T');
        }
      });
      this.createForm();
      this.ajusteCSS();
    }

    createForm(): void {
      this.form = this.formBuilder.group({
        calendarId: [this.data.element.id],
        isDriver: [this.data.isDriver],
        personId: [''],
        isCollect: [this.data.isCollect || false]
      });
    }

    onNoClick(): void {
      this.dialogRef.close();
    }

    onSubmit(): void {
      
      this.calendarService.updateDriverOrTechniqueCalendar(
        this.form.value.personId,
        this.form.value.calendarId,
        this.form.value.isDriver,
        this.form.value.isCollect
      ).subscribe((resp) => {
        if (this.isDriver){
          this.toastr.success('Motorista atualizado com sucesso');
        }else{
          this.toastr.success('Técnica atualizada com sucesso');
        }
        this.dialogRef.close(resp);
      }, (error: any) => {
        this.toastr.warning(error.error?.errorMessage)
      })
      
    }

    ajusteCSS(): void {
      document.querySelectorAll<HTMLElement>('.mat-dialog-content')
            .forEach(el => el.setAttribute("style","height: 100px !important"));

      document.querySelectorAll('.mat-select')
            .forEach(el => el.setAttribute('style', 'display: contents'));

    }
  }