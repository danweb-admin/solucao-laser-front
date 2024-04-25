import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HistortService } from '../services/history.service';

@Component({
    selector: 'app-history',
    templateUrl: 'history.component.html',
    styleUrls: ['./history.component.scss']
  })
  export class HistoryComponent implements OnInit {
    
    histories: any[] = [];
    constructor(
      public dialogRef: MatDialogRef<HistoryComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private historyService: HistortService) {

    }

    ngOnInit(): void {
      this.historyService.loadHistories( this.data.tableName, this.data.element.id).subscribe((resp: any[]) => {
        this.histories = resp;
      });
    }
    close(){
        this.dialogRef.close();
    }
    
  }