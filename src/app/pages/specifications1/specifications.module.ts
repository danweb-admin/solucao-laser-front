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
import { SpecificationsService } from 'src/app/shared/services/specifications.service';
import { SpecificationsRoutingModule } from './specifications-routing.module';
import { SpecificationsPageComponent } from './containers/specifications-page.component';
import { SpecificationsTableComponent } from './components/specifications-table/specifications-table.component';
import { SpecificationsDialogComponent } from './components/specifications-dialog/specifications-dialog.component';

@NgModule({
  declarations: [
      SpecificationsPageComponent,
      SpecificationsTableComponent,
      SpecificationsDialogComponent,
  ],
  imports: [
    CommonModule,
    SpecificationsRoutingModule,
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
    SpecificationsService
  ]
})
export class SpecificationsModule { }
