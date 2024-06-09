import { Equipament } from './../../../../shared/models/equipament';
import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { Person } from '../../../../shared/models/person';
import { SpecificationsService } from 'src/app/shared/services/specifications.service';
import { Specification } from 'src/app/shared/models/specification';
import { EquipamentsDialogComponent } from '../equipaments-dialog/equipaments-dialog.component';
import { EquipamentsService } from 'src/app/shared/services/equipaments.service';
import { LoginFormComponent } from 'src/app/pages/auth/components';


@Component({
  selector: 'app-equipaments-table',
  templateUrl: './equipaments-table.component.html',
  styleUrls: ['./equipaments-table.component.scss']
})
export class EquipamentsTableComponent implements OnInit {
  public displayedColumns: string[] = ['nome','ativo'];
  public dataSource: Equipament[] = [];
  public selection = new SelectionModel<Specification>(true, []);
  public selectedTabIndex = 0;
  public isShowFilterInput = false;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild('tabGroup') tabGroup;

  constructor(public dialog: MatDialog, 
    private equipamentsService: EquipamentsService) {}

  public ngOnInit(): void {
    this.equipamentsService.loadEquipaments(true).subscribe((resp: Equipament[]) => {
      this.dataSource = resp;
      console.log(resp);
      
    })
  }

  public showAtivo(ativo: boolean): string {
    if (ativo)
      return 'Ativo';
    return 'Inativo';
  }

  openDialog(element: Equipament): void {
    
    const dialogRef = this.dialog.open(EquipamentsDialogComponent, {
      width: '700px',
      height: '600px',
      data: {element}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === undefined)
        return;
      
        this.equipamentsService.loadEquipaments(true).subscribe((resp: Equipament[]) => {
          this.dataSource = resp;
        })     
    });
  }
}