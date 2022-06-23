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
import { EquipamentsPageComponent } from './containers/equipaments-page.component';
import { EquipamentsService } from 'src/app/shared/services/equipaments.service';
import { EquipamentsRoutingModule } from './equipaments-routing.module';
import { EquipamentsDialogComponent } from './components/equipaments-dialog/equipaments-dialog.component';
import { EquipamentsTableComponent } from './components/equipaments-table/equipaments-table.component';

@NgModule({
  declarations: [
      EquipamentsPageComponent,
      EquipamentsTableComponent,
      EquipamentsDialogComponent,
  ],
  imports: [
    CommonModule,
    EquipamentsRoutingModule,
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
    EquipamentsService
  ]
})
export class EquipamentsModule { }
