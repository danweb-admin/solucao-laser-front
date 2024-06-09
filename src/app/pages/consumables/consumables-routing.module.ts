import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ConsumablesPageComponent } from './containers/consumables-page.component';


const routes: Routes = [
  {
    path: '',
    component: ConsumablesPageComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})

export class ConsumablesRoutingModule {
}
