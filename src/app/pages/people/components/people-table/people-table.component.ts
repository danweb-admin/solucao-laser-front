  import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
  import { MatTableDataSource } from '@angular/material/table';
  import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
  import { SelectionModel } from '@angular/cdk/collections';
  import { MatPaginator } from '@angular/material/paginator';
  import { Person } from '../../../../shared/models/person';
  import { PeopleDialogComponent } from '../people-dialog/people-dialog.component';
  import { PersonService } from '../../../../shared/services/people.service';
  import { MatTabChangeEvent } from '@angular/material/tabs';


  @Component({
    selector: 'app-people-table',
    templateUrl: './people-table.component.html',
    styleUrls: ['./people-table.component.scss']
  })
  export class PeopleTableComponent implements OnInit {
    public displayedColumns: string[] = ['nome', 'celular', 'placa', 'ativo'];
    public dataSource: Person[] = [];
    public selection = new SelectionModel<Person>(true, []);
    public selectedTabIndex = 0;
    public isShowFilterInput = false;

    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @ViewChild('tabGroup') tabGroup;

    constructor(public dialog: MatDialog, 
      private personService: PersonService) {}

    public ngOnInit(): void {
      this.personService.loadPeople(true).subscribe((resp: Person[]) => {
        this.dataSource = resp;
      })
    }


    public showAtivo(ativo: boolean): string {
      if (ativo)
        return 'Ativo';
      return 'Inativo';
    }

    tabChangedEvent = (tabChangeEvent: MatTabChangeEvent): void => {
      this.dataSource = [];
      this.tabChanged(tabChangeEvent.index);
    }


    openDialog(element: Person): void {
      
      const dialogRef = this.dialog.open(PeopleDialogComponent, {
        width: '700px',
        height: '600px',
        data: {element}
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result === undefined)
          return;
        
        this.tabChanged(this.tabGroup.selectedIndex);           
      });
    }

    tabChanged(tab: number){
      if (tab === 0){
        this.personService.loadPeople(true).subscribe((resp: Person[]) => {
          this.dataSource = resp;
        });
      }else{
        this.personService.loadPeople(false).subscribe((resp: Person[]) => {
          this.dataSource = resp;
        });
      }
    }
  }