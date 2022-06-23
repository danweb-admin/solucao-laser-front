import { Component } from '@angular/core';
import { routes } from '../../consts/routes';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  public routes: typeof routes = routes;
  public isOpenLocations = false;
  public isOpenEquipaments = false;

  public openLocations() {
    this.isOpenLocations = !this.isOpenLocations;
  }

  public openEquipaments(){
    this.isOpenEquipaments = !this.isOpenEquipaments;
  }
}
