import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AuthPageComponent } from './containers';
import { AuthRoutingModule } from './auth-routing.module';
import { YearPipe } from './pipes';
import { AuthService, EmailService, SignService } from './services';
import { LoginFormComponent, SignFormComponent } from './components';
import { AuthGuard } from './guards';

@NgModule({
  declarations: [
    AuthPageComponent,
    YearPipe,
    LoginFormComponent,
    SignFormComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MatTabsModule,
    MatButtonModule,
    MatInputModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    AuthService,
    EmailService,
    SignService,
    AuthGuard
  ]
})
export class AuthModule { }
