import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { routes } from 'src/app/consts';
import { City } from '../models/city';
import { State } from '../models/state';

@Injectable()
export class EstadosCidadesServices  {

  public routers: typeof routes = routes;
  // doc api ibge - https://servicodados.ibge.gov.br/api/docs/localidades#api-_
  private API_IBGE = 'https://servicodados.ibge.gov.br/api/v1/localidades';

  constructor(private http: HttpClient){

  }

  public getEstados(){
      return this.http.get(`${this.API_IBGE}/estados?orderBy=nome`)
      .pipe(map((resp: State[]) => {
        return resp;
      }));
  }

  public getEstado(stateId: number){
    return this.http.get(`${this.API_IBGE}/estados/${stateId}`)
      .pipe(map((resp: State) => {
        return resp;
      }));
  }

  public getCidadesByEstado(stateId: number){
    return this.http.get(`${this.API_IBGE}/estados/${stateId}/municipios?orderBy=nome`)
      .pipe(map((resp: City[]) => {
        return resp;
      }));
  }
  public getCidade(cityId: number){
    return this.http.get(`${this.API_IBGE}/municipios/${cityId}`)
      .pipe(map((resp: City) => {
        return resp;
      }));
  }
  

}