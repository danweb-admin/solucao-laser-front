import { Component, Inject, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/pages/auth/models';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
    selector: 'app-users-dialog',
    templateUrl: 'users-dialog.component.html',
    styleUrls: ['./users-dialog.component.scss']
  })
  export class UsersDialogComponent implements OnInit, AfterViewInit {
    form: FormGroup;
    isAddMode: boolean;
    id: string; 

    constructor(
      public dialogRef: MatDialogRef<UsersDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private userService: UserService,
      private formBuilder: FormBuilder,
      private toastr: ToastrService) {
        
    }

    ngOnInit(): void {
      this.id = this.data.element;
      this.isAddMode = !this.id;

      this.form = this.formBuilder.group({
        id:  [this.data.element?.id || ''],
        name: [this.data.element?.name || '', Validators.required],
        email: [this.data.element?.email || '', Validators.required],
        active: [ this.isAddMode ? true : this.data.element?.active, Validators.required],
        role: [this.isAddMode ? 'admin' : this.data.element?.role, Validators.required],
        nickName: [this.isAddMode ? '' : this.data.element?.nickName, Validators.required],
        password: this.isAddMode ? ['', Validators.required] : [''],
        createdAt: [this.data.element?.createdAt || new Date()],
        updatedAt: [this.data.element?.updatedsAt || null],
      });
    }

    ngAfterViewInit(): void {
      this.ajustesCSS();
    }
  
    onNoClick(): void {
      this.dialogRef.close();
    }

    onSubmit(){
      if (this.form.value.id === ""){
        this.userService.save(this.form.value).subscribe((resp: User) => {
          this.toastr.success('Usuário adicionado.');
          this.dialogRef.close(resp);
        });
      } else {
        this.userService.update(this.form.value).subscribe((resp: User) => {
          this.toastr.success('Usuário atualizado!');
          this.dialogRef.close(resp);
        });
      }
    }

    ajustesCSS(){
      var mat_select = document.getElementsByClassName('mat-select');
      var mat_dialog = document.getElementsByClassName('mat-dialog-content');
      mat_dialog[0].setAttribute('style','overflow-y: hidden');
      for (var i = 0; i < mat_select.length; i++) {
        mat_select[i].setAttribute('style', 'display: contents');
      }
    }
  }