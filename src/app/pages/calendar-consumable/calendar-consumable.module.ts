import { StickyNotesService } from './../../shared/services/sticky-notes.service';
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
import { NgxMaskModule } from 'ngx-mask'
import { MatTabsModule } from '@angular/material/tabs';
import { CalendarService } from 'src/app/shared/services/calendar.service';
import { TextMaskModule } from 'angular2-text-mask';
import { ConsumableComponent } from './consumable/consumable.component';
import { CalendarConsumableRoutingModule } from './calendar-consumable-routing.module';
import {MatExpansionModule} from '@angular/material/expansion';
import { ConsumableFormsComponent } from './consumable-forms/consumable-forms.component';
import { CalendarConsumablePageComponent } from './calendar-consumable-page/calendar-consumable-page.component';

@NgModule({
  declarations: [
      ConsumableComponent,
      CalendarConsumablePageComponent,
      ConsumableFormsComponent
  ],
  imports: [
    CommonModule,
    CalendarConsumableRoutingModule,
    MatCardModule,
    MatExpansionModule,
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
    TextMaskModule,
    NgxMaskModule.forChild(),
  ],
  providers: [
    CalendarService
  ]
})
export class CalendarConsumableModule { }
