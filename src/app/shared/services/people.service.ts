import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Person } from '../models/person';

const URL_PEOPLE = '/api/v1/people';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  
  constructor(private http: HttpClient){

  }

  loadPeople(ativo: boolean): Observable<Person[]> {
    return this.http.get(`${environment.URL_API}${URL_PEOPLE}/?ativo=${ativo}`)
    .pipe(map((resp: Person[]) => {
      return resp;
    }));
  }

  getById(id: number): Observable<Person> {
    return this.http.get(`${environment.URL_API}${URL_PEOPLE}?id=${id}`)
    .pipe(map((resp: Person) => {
      return resp;
    }));
  }

  getByName(personType: string, name: string): Observable<Person> {
    return this.http.get(`${environment.URL_API}${URL_PEOPLE}/get-by-name?tipo_pessoa=${personType}&nome=${name}`)
    .pipe(map((resp: Person) => {
      return resp;
    }));
  }

  save(person: Person): Observable<Person>{
    return this.http.post(`${environment.URL_API}${URL_PEOPLE}`,person)
    .pipe(map((resp: Person) => {
      return resp;
    }));
  }

  update(person: Person): Observable<Person>{
    return this.http.put(`${environment.URL_API}${URL_PEOPLE}/${person.id}`,person)
    .pipe(map((resp: Person) => {
      return resp;
    }));
  }
}
