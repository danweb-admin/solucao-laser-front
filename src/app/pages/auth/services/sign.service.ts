import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Email, User } from '../models';

const URL_USERS = '/api/v1/user';

@Injectable({
  providedIn: 'root'
})
export class SignService {

    constructor(private http: HttpClient){

    }
}
