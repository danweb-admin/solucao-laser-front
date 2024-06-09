import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ConsumableComponent } from './consumable/consumable.component';
import { CalendarConsumablePageComponent } from './calendar-consumable-page/calendar-consumable-page.component';


const routes: Routes = [
  {
    path: '',
    component: CalendarConsumablePageComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})

export class CalendarConsumableRoutingModule {
}
