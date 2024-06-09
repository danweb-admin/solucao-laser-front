import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Consumable } from '../models/consumable';
import { Equipament } from '../models/equipament';

const URL_CONSUMABLES = '/api/v1/consumables';

@Injectable({
  providedIn: 'root'
})
export class ConsumablesService {
  
  constructor(private http: HttpClient){

  }

  loadConsumables(): Observable<Consumable[]> {
    return this.http.get(`${environment.URL_API}${URL_CONSUMABLES}`)
    .pipe(map((resp: Consumable[]) => {
      return resp;
    }));
  }

  save(consumable: Consumable): Observable<Consumable>{
    return this.http.post(`${environment.URL_API}${URL_CONSUMABLES}`,consumable)
    .pipe(map((resp: Consumable) => {
      return resp;
    }));
  }

  update(consumable): Observable<Consumable>{
    return this.http.put(`${environment.URL_API}${URL_CONSUMABLES}/${consumable.id}`,consumable)
    .pipe(map((resp: Consumable) => {
      return resp;
    }));
  }
}
