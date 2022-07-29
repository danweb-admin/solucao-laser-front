import { Component, OnInit } from '@angular/core';
import { Months } from 'src/app/shared/models/months';

@Component({
  selector: 'app-availability-table',
  templateUrl: './availability-table.component.html',
  styleUrls: ['./availability-table.component.scss']
})
export class AvailabilityTableComponent implements OnInit {
  
  months: any = [];
  monthSelected: any;
  constructor() {
    this.startMonthArray();
  }

  public ngOnInit(): void {
    const table = document.querySelector('.main-table');

    let clone = table.cloneNode(true) as HTMLElement;
    clone.className += " fixed-table";

    let body = document.getElementById('table-scroll');

    body.appendChild(clone);
    this.monthSelected = this.months.find(x => x.month === 'jan')
    console.log(this.monthSelected);
  }

  startMonthArray(): void {
    this.months = [{
        month: "jan",
        daysAmount: 31
    },
    {
        month: "feb",
        daysAmount: 28
    },
    {
        month: "mar",
        daysAmount: 31
    },
    {
        month: "apr",
        daysAmount: 30
    },
    {
        month: "may",
        daysAmount: 31
    },
    {
        month: "jun",
        daysAmount: 30
    },
    {
        month: "jul",
        daysAmount: 31
    },
    {
        month: "aug",
        daysAmount: 31
    },
    {
        month: "sep",
        daysAmount: 30
    },
    {
        month: "oct",
        daysAmount: 31
    },
    {
        month: "nov",
        daysAmount: 30
    },
    {
        month: "dec",
        daysAmount: 31
    },];
  }
}