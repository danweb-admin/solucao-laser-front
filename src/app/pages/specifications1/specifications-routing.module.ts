import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SpecificationsPageComponent } from './containers/specifications-page.component';


const routes: Routes = [
  {
    path: '',
    component: SpecificationsPageComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})

export class SpecificationsRoutingModule {
}
