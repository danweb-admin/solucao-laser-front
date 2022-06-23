import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { SharedModule } from '../../shared/shared.module';
import { PeopleRoutingModule } from './people-routing.module';
import { PeoplePageComponent } from './containers/people-page/people-page.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { PersonService } from '../../shared/services/people.service';
import { PeopleTableComponent } from './components/people-table/people-table.component';
import { PeopleDialogComponent } from './components/people-dialog/people-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { NgxMaskModule, IConfig } from 'ngx-mask'
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  declarations: [
      PeoplePageComponent,
      PeopleTableComponent,
      PeopleDialogComponent,
  ],
  imports: [
    CommonModule,
    PeopleRoutingModule,
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
    PersonService
  ]
})
export class PeopleModule { }
