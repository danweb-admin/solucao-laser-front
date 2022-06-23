import { Component, Inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CalendarService } from 'src/app/shared/services/calendar.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-status-dialog',
    templateUrl: 'status-dialog.component.html',
    styleUrls: ['./status-dialog.component.scss']
  })
  export class StatusDialogComponent implements OnInit {
    form: FormGroup;
    isTravelOn: boolean;
    selectedtype: any;
    icons: any = [
      {
        id: "0",
        icon: ""
      },
      {
        id: "1",
        icon: "arrow_forward"
      },
      {
        id: "2",
        icon: "arrow_back"
      },
      {
        id: "3",
        icon: "swap_horiz"
      }
    ];

    constructor(public dialogRef: MatDialogRef<StatusDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private formBuilder: FormBuilder,
      private toastr: ToastrService,
      private calendarService: CalendarService) {
      this.isTravelOn = data.isTravelOn;
    }

    ngOnInit(): void {
      this.createForm();
      setTimeout(() => {
        this.ajusteCSS();
      },500); 
    }

    createForm(): void {
      this.form = this.formBuilder.group({
        calendarId: [this.data.element.id],
        isTravelOn: [this.data.isTravelOn],
        status: [''],
        travelOn: ['']
      });
    }

    onNoClick(): void {
      this.dialogRef.close();
    }

    onSubmit(): void {
      this.calendarService.updateStatusOrTravelOnCalendar(
        this.form.value.status,
        this.form.value.calendarId,
        this.form.value.isTravelOn,
        this.form.value.travelOn
      ).subscribe((resp) => {
        if (this.isTravelOn){
          this.toastr.success('Segue viagem atualizada com sucesso');
        }else{
          this.toastr.success('Status atualizada com sucesso');
        }
        this.dialogRef.close(resp);
      }, (error: any) => {
        this.toastr.warning(error.error?.errorMessage)
      })
      
    }

    onRoomChange(value){
        this.selectedtype = this.icons.find(x => x.id == value).icon;
      }

    ajusteCSS(): void {
      document.querySelectorAll<HTMLElement>('.mat-dialog-content')
            .forEach(el => el.setAttribute("style","height: 100px !important"));

            var mat_select = document.getElementsByClassName('mat-select');
            for (var i = 0; i < mat_select.length; i++) {
              mat_select[i].setAttribute('style', 'display: contents');
            }

    }
  }