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
import { EquipamentsService } from 'src/app/shared/services/equipaments.service';
import { ConsumablesRoutingModule } from './consumables-routing.module';
import { ConsumablesPageComponent } from './containers/consumables-page.component';
import { ConsumablesTableComponent } from './components/consumables-table/consumables-table.component';
import { ConsumablesDialogComponent } from './components/consumables-dialog/consumables-dialog.component';
import { ConsumablesService } from 'src/app/shared/services/consumables.service';

@NgModule({
  declarations: [
      ConsumablesPageComponent,
      ConsumablesTableComponent,
      ConsumablesDialogComponent,
  ],
  imports: [
    CommonModule,
    ConsumablesRoutingModule,
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
    ConsumablesService
  ]
})
export class ConsumablesModule { }
