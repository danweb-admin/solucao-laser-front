import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {MatDialog } from '@angular/material/dialog';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { ClientsService } from '../../../../shared/services/clients.service';
import { Client } from '../../../../shared/models/client';
import { ClientsDialogComponent } from '../clients-dialog/clients-dialog.component';
import { EstadosCidadesServices } from 'src/app/shared/services/estados-cidades.service';
import { MatTableDataSource } from '@angular/material/table';
import { CustomPaginator } from 'src/app/shared/shared';


@Component({
  selector: 'app-clients-table',
  templateUrl: './clients-table.component.html',
  styleUrls: ['./clients-table.component.scss']
})
export class ClientsTableComponent implements OnInit {
  public displayedColumns: string[] = ['nome', 'celular', 'telefone', 'cidade'];
  public dataSource: MatTableDataSource<Client> = new MatTableDataSource<Client>();
  public selection = new SelectionModel<Client>(true, []);
  public selectedTabIndex = 0;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild('tabGroup') tabGroup;
  @ViewChild('inputSearch') inputSearch: ElementRef;

  constructor(public dialog: MatDialog, 
    private clientsService: ClientsService) {}

  public ngOnInit(): void {
    this.getClients(true,'');
  }


  showAtivo(ativo: boolean): string {
    if (ativo)
      return 'Ativo';
    return 'Inativo';
  }

  tabChangedEvent = (tabChangeEvent: MatTabChangeEvent): void => {
    this.dataSource = new MatTableDataSource<Client>();
    this.tabChanged(tabChangeEvent.index);
  }

  applyFilter(event: Event): void {
    let length = this.inputSearch.nativeElement.value.length;
    let tab = !Boolean(JSON.parse(this.tabGroup._selectedIndex));
    
    if (length > 2){
      const filterValue = (event.target as HTMLInputElement).value;
      this.getClients(tab,filterValue);
    }
  }

  closeFilterInput(): void {
    this.inputSearch.nativeElement.value = '';
    if (this.selectedTabIndex === 0){
      this.getClients(true,'');
    }else{
      this.getClients(false,'');
    }
  }


  openDialog(element: Client): void {
    
    const dialogRef = this.dialog.open(ClientsDialogComponent, {
      width: '800px',
      height: '600px',
      disableClose: true,
      data: {element}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === undefined)
        return;
      
      this.tabChanged(this.tabGroup.selectedIndex);           
    });
  }

  tabChanged(tab: number){
    this.selectedTabIndex = tab;
    if (tab === 0){
      this.getClients(true,'');
    }else{
      this.getClients(false,'');
    }
  }

  private getClients(active: boolean, search: string){
    
    this.clientsService.getClients(active,search).subscribe((resp: Client[]) => {
      this.dataSource = new MatTableDataSource<Client>();
      this.dataSource = new MatTableDataSource<Client>(resp);
      this.dataSource.paginator = this.paginator;

    });

    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.paginator._intl = CustomPaginator();
    }
  }
}