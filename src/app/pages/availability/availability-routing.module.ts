import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AvailabilityPageComponent } from './container/availability-page.component';


const routes: Routes = [
  {
    path: '',
    component: AvailabilityPageComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})

export class AvailabilityRoutingModule {
}
