import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { Person } from '../../../../shared/models/person';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { SpecificationsDialogComponent } from '../specifications-dialog/specifications-dialog.component';
import { SpecificationsService } from 'src/app/shared/services/specifications.service';
import { Specification } from 'src/app/shared/models/specification';


@Component({
  selector: 'app-specifications-table',
  templateUrl: './specifications-table.component.html',
  styleUrls: ['./specifications-table.component.scss']
})
export class SpecificationsTableComponent implements OnInit {
  public displayedColumns: string[] = ['nome','ativo'];
  public dataSource: Specification[] = [];
  public selection = new SelectionModel<Specification>(true, []);
  public selectedTabIndex = 0;
  public isShowFilterInput = false;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild('tabGroup') tabGroup;

  constructor(public dialog: MatDialog, 
    private specificationsService: SpecificationsService) {}

  public ngOnInit(): void {
    this.specificationsService.loadSpecifications().subscribe((resp: Specification[]) => {
      this.dataSource = resp;
    })
  }


  public showAtivo(ativo: boolean): string {
    if (ativo)
      return 'Ativo';
    return 'Inativo';
  }

  openDialog(element: Person): void {
    
    const dialogRef = this.dialog.open(SpecificationsDialogComponent, {
      width: '700px',
      height: '600px',
      data: {element}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === undefined)
        return;
      
        this.specificationsService.loadSpecifications().subscribe((resp: Specification[]) => {
          this.dataSource = resp;
        })     
    });
  }
}