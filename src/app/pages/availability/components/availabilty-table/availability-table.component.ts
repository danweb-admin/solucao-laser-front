import { Component, OnInit } from '@angular/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import moment from 'moment';
import { MY_FORMATS } from 'src/app/consts/my-format';
import * as htmlToImage from 'html-to-image';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-availability-table',
  templateUrl: './availability-table.component.html',
  styleUrls: ['./availability-table.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class AvailabilityTableComponent implements OnInit {
  
  months: any = [];
  monthSelected: any;
  days_: any = [];
  constructor() {
    
  }

  public ngOnInit(): void {
    this.days_ = this.getDaysInMonthUTC(1,2022);
    const table = document.querySelector('.main-table');

    let clone = table.cloneNode(true) as HTMLElement;
    clone.className += " fixed-table";

    let body = document.getElementById('table-scroll');

    body.appendChild(clone);
    this.monthSelected = this.months.find(x => x.month === 'jan')
    console.log(this.days_);
  }

  getDaysInMonthUTC(month, year) {
    let date = new Date(year, month, 1);
    let days = [];
    while (date.getUTCMonth() === month) {
      days.push(moment(new Date(date)));
      date.setUTCDate(date.getUTCDate() + 1);
    }
    return days;
  }

  download(){
    var container = document.getElementById("main-table");; // full page 
		html2canvas(container,{allowTaint : true}).then(function(canvas) {
		
			var link = document.createElement("a");
			document.body.appendChild(link);
			link.download = "html_image.png";
			link.href = canvas.toDataURL("image/png");
			link.target = '_blank';
			link.click();
		});
  }

  
}