import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';

import { routes } from '../../../../consts';
import { User } from '../../../../pages/auth/models';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  isAdmin = false;
  @Input() user: User;
  @Output() signOut: EventEmitter<void> = new EventEmitter<void>();
  public routes: typeof routes = routes;

  constructor(private userService: UserService){
    this.isAdmin = this.userService.isAdmin();
  }

  public signOutEmit(): void {
    this.signOut.emit();
  }
}
