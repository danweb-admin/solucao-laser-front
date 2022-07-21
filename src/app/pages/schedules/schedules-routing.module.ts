import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SchedulesPageComponent } from './container/schedules-page.component';


const routes: Routes = [
  {
    path: '',
    component: SchedulesPageComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})

export class SchedulesRoutingModule {
}
