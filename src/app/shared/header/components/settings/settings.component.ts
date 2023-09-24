import { Component } from '@angular/core';
import { routes } from 'src/app/consts';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
  public routes: typeof routes = routes;
}
