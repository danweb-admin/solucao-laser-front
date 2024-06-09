import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CalendarService } from 'src/app/shared/services/calendar.service';
import { Calendar } from 'src/app/shared/models/calendar';
import moment from 'moment';

@Component({
    selector: 'app-consumable',
    templateUrl: 'consumable.component.html',
    styleUrls: ['./consumable.component.scss']
  })
  export class ConsumableComponent implements OnInit {
    form: FormGroup;
    isTravelOn: boolean;
    selectedtype: any;
    locacoes: Calendar[] = [];
    time;


    constructor(
      private calendarService: CalendarService) {
        this.time = moment();
    }

    ngOnInit(): void {
      
      this.time = moment(this.time, 'DD-MM-YYYY', true);
      let date = this.time.format('YYYY-MM-DD');
      this.calendarService.getCalendarAll(date).subscribe((resp: any) => {
        this.locacoes = resp;
      });

    }
  }