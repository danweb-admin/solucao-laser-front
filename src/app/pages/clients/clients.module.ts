import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from '../../shared/shared.module';
import { MatMenuModule } from '@angular/material/menu';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { NgxMaskModule, IConfig } from 'ngx-mask'
import { MatTabsModule } from '@angular/material/tabs';
import { ClientsRoutingModule } from './clients-routing.module';
import { ClientsDialogComponent } from './components/clients-dialog/clients-dialog.component';
import { ClientsTableComponent } from './components/clients-table/clients-table.component';
import { ClientsPageComponent } from './containers/clients-page/clients-page.component';
import { ClientsService } from '../../shared/services/clients.service';

@NgModule({
  declarations: [
      ClientsPageComponent,
      ClientsTableComponent,
      ClientsDialogComponent,
  ],
  imports: [
    CommonModule,
    ClientsRoutingModule,
    MatCardModule,
    MatIconModule,
    MatMenuModule,
    MatTableModule,
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatDialogModule,
    MatTabsModule,
    SharedModule,
    NgxMaskModule.forChild(),
  ],
  providers: [
    ClientsService
  ]
})
export class ClientsModule { }
