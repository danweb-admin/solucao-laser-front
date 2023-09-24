import { Component, OnInit} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { routes } from 'src/app/consts';
import { User } from 'src/app/pages/auth/models';
import { UserService } from 'src/app/shared/services/user.service';
import { UsersDialogComponent } from '../users-dialog/users-dialog.component';

@Component({
    selector: 'app-users',
    templateUrl: 'users-table.component.html',
    styleUrls: ['./users-table.component.scss']
  })
  export class UsersComponent implements OnInit{
    
    form: FormGroup;
    dataSource: User[] = [];
    public routers: typeof routes = routes;

    constructor(public dialog: MatDialog,
        private userService: UserService) {
    }

    ngOnInit(): void {
      this.loadUsers();
    }

    loadUsers(): void{
      this.userService.loadUsers().subscribe((resp: User[]) => {
          this.dataSource = resp;
      });
    }

    openDialog(element){
      const dialogRef = this.dialog.open(UsersDialogComponent, {
        width: '700px',
        height: '600px',
        data: {element}
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result === undefined)
          return;
        
        this.loadUsers();
        
      });
    }

    
  }