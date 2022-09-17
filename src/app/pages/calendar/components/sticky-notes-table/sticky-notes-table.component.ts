import { StickyNotes } from './../../../../shared/models/stickyNotes';
import { StickyNotesService } from './../../../../shared/services/sticky-notes.service';
import { SelectionModel } from '@angular/cdk/collections';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MatTableDataSource } from '@angular/material/table';
import { Calendar } from 'src/app/shared/models/calendar';
import { MY_FORMATS } from 'src/app/consts/my-format';
import moment from 'moment';
import { StickyNotesDialogComponent } from '../sticky-notes-dialog/sticky-notes-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/shared/services/user.service';



@Component({
    selector: 'app-sticky-notes-table',
    templateUrl: 'sticky-notes-table.component.html',
    styleUrls: ['./sticky-notes-table.component.scss',],
    providers: [
      {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
      {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
    ],
  })
  export class StickyNotesTableComponent implements OnChanges{
    
    dataSource: StickyNotes[];
    innerValue: Date = new Date();
    isAdmin = false;
    @Input() today: string;

    constructor(private stickyNotesService: StickyNotesService,
                private userService: UserService,
                public dialog: MatDialog,) {
      this.isAdmin = this.userService.isAdmin();
    }

    ngOnChanges(changes: SimpleChanges): void {
      this.getStickyNotes();
    }

    updateResolved(item: StickyNotes){
      this.stickyNotesService.updateResolved(item.id).subscribe((resp: StickyNotes) => {
        this.getStickyNotes();
      });
    }

    remove(item: StickyNotes){
      this.stickyNotesService.remove(item.id).subscribe((resp: StickyNotes) => {
        this.getStickyNotes();
      });
    }

    openDialog(element: StickyNotes){
      const dialogRef = this.dialog.open(StickyNotesDialogComponent, {
        width: '600px',
        height: '300px',
        disableClose: true,
        data: {element}
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result === undefined)
          return;
        
        this.getStickyNotes();
        
      });
    }

    getStickyNotes(){
      let time = moment(this.today, "DD/MM/YYYY");
      this.stickyNotesService.loadStickyNotes(time.format('YYYY-MM-DD')).subscribe((resp: StickyNotes[]) => {
        this.dataSource = resp;
      });
    }
  }