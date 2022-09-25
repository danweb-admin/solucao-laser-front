import { Component, Inject, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { routes } from 'src/app/consts';
import { User } from 'src/app/pages/auth/models';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
    selector: 'app-change-user-password',
    templateUrl: 'change-user-password.component.html',
    styleUrls: ['./change-user-password.component.scss']
  })
  export class ChangeUserPasswordComponent implements OnInit, AfterViewInit{
    
    form: FormGroup;
    public routers: typeof routes = routes;

    constructor(
        private formBuilder: FormBuilder,
        private userService: UserService,
        private toastr: ToastrService,
        private router: Router
        ) {
    }
    ngAfterViewInit(): void {
        document
            .querySelectorAll<HTMLElement>('.header__title-button-icon')
            .forEach(node => node.click())
    }

    ngOnInit(): void {
        
        
        this.form = this.formBuilder.group({
            email: ['',Validators.required],
            password: ['',[Validators.required, Validators.minLength(8)]]
        });
    }

    onSubmit(): void{
        let user = this.form.value as User;
        this.userService.changeUserPassword(user).subscribe((resp: User) => {
            this.toastr.success('Senha alterada com sucesso.');
            this.router.navigate([this.routers.LOGIN]).then();
        })
    }
  }