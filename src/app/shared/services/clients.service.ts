import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { URL } from 'url';
import { Client } from '../models/client';

const URL_CLIENTS = '/api/v1/client';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  
  constructor(private http: HttpClient){

  }

  getClients(ativo: boolean, search: string): Observable<Client[]> {
    return this.http.get(`${environment.URL_API}${URL_CLIENTS}/?ativo=${ativo}&search=${search}`)
    .pipe(map((resp: Client[]) => {
      return resp;
    }));
  }

  save(client: Client): Observable<Client>{
    return this.http.post(`${environment.URL_API}${URL_CLIENTS}`,client)
    .pipe(map((resp: Client) => {
      return resp;
    }));
  }

  update(client: Client): Observable<Client>{
    return this.http.put(`${environment.URL_API}${URL_CLIENTS}/${client.id}`,client)
    .pipe(map((resp: Client) => {
      return resp;
    }));
  }

}
