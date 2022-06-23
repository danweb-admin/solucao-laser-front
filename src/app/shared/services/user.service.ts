import { StickyNotes } from './../models/stickyNotes';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/pages/auth/models';

const URL_USER = '/api/v1/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  constructor(private http: HttpClient){
  }

  changeUserPassword(user: User): Observable<User>{
    return this.http.post(`${environment.URL_API}${URL_USER}/change-user-password`,user)
    .pipe(map((resp: User) => {
      return resp;
    }));
  }
}
