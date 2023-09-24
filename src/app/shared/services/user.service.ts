import { StickyNotes } from './../models/stickyNotes';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/pages/auth/models';
import { Guid } from 'guid-typescript';

const URL_USER = '/api/v1/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  constructor(private http: HttpClient){
  }

  isAdmin(): boolean{
    let admin = localStorage.getItem('role');
    if (admin.match('admin'))
      return true;
    return false
  }

  loadUsers(): Observable<User[]>{
    return this.http.get(`${environment.URL_API}${URL_USER}`)
    .pipe(map((resp: User[]) => {
      return resp;
    }));
  }

  changeUserPassword(user: User): Observable<User>{
    return this.http.post(`${environment.URL_API}${URL_USER}/change-user-password`,user)
    .pipe(map((resp: User) => {
      return resp;
    }));
  }

  save(user: User): Observable<User>{
    user.id = Guid.create().toString();
    return this.http.post(`${environment.URL_API}${URL_USER}`,user)
    .pipe(map((resp: User) => {
      return resp;
    }));
  }

  update(user: User): Observable<User>{
    return this.http.put(`${environment.URL_API}${URL_USER}/${user.id}`,user)
    .pipe(map((resp: User) => {
      return resp;
    }));
  }
}
