import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { Person } from '../../../../shared/models/person';
import { ConsumablesDialogComponent } from '../consumables-dialog/consumables-dialog.component';
import { Consumable } from 'src/app/shared/models/consumable';
import { ConsumablesService } from 'src/app/shared/services/consumables.service';


@Component({
    selector: 'app-consumables-table',
    templateUrl: './consumables-table.component.html',
    styleUrls: ['./consumables-table.component.scss']
})
export class ConsumablesTableComponent implements OnInit {
    public displayedColumns: string[] = ['nome','ativo'];
    public dataSource: Consumable[] = [];
    public selection = new SelectionModel<Consumable>(true, []);
    public selectedTabIndex = 0;
    public isShowFilterInput = false;
    
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @ViewChild('tabGroup') tabGroup;
    
    constructor(public dialog: MatDialog, 
        private consumablesService: ConsumablesService) {}
        
        public ngOnInit(): void {
            this.loadConsumables();
        }
        
        loadConsumables(){
            this.consumablesService.loadConsumables().subscribe((resp: Consumable[]) => {
                this.dataSource = resp;
            });
        }
        
        
        public showAtivo(ativo: boolean): string {
            if (ativo)
            return 'Ativo';
            return 'Inativo';
        }
        
        
        openDialog(element: Consumable): void {
            
            const dialogRef = this.dialog.open(ConsumablesDialogComponent, {
                width: '700px',
                height: '600px',
                data: {element}
            });
            
            dialogRef.afterClosed().subscribe(result => {
                if (result === undefined)
                return;
                
                this.loadConsumables();    
            });
        }
    }