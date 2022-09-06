import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Specification } from '../models/specification';

const URL_SPECIFICATIONS = '/api/v1/specifications';

@Injectable({
  providedIn: 'root'
})
export class SpecificationsService {
  
  constructor(private http: HttpClient){

  }

  loadSpecifications(): Observable<Specification[]> {
    return this.http.get(`${environment.URL_API}${URL_SPECIFICATIONS}`)
    .pipe(map((resp: Specification[]) => {
      return resp;
    }));
  }

  save(specification: Specification): Observable<Specification>{
    
    return this.http.post(`${environment.URL_API}${URL_SPECIFICATIONS}`,specification)
    .pipe(map((resp: Specification) => {
      return resp;
    }));
  }

  update(specification: Specification): Observable<Specification>{
    return this.http.put(`${environment.URL_API}${URL_SPECIFICATIONS}/${specification.id}`,specification)
    .pipe(map((resp: Specification) => {
      return resp;
    }));
  }

  getSpecificationByEquipament(equipamentIds: string): Observable<Specification[]>{
    return this.http.get(`${environment.URL_API}${URL_SPECIFICATIONS}/get-specification-by-equipament?equipamentList=${equipamentIds}`)
    .pipe(map((resp: Specification[]) => {
      return resp;
    }));
  }
}
