import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const URL_HISTORY = '/api/v1/histories';

@Injectable({
  providedIn: 'root'
})
export class HistortService {
  
  constructor(private http: HttpClient){
  }

  loadHistories(tableName: string, recordId: string): Observable<any[]>{
    return this.http.get(`${environment.URL_API}${URL_HISTORY}?tableName=${tableName}&recordId=${recordId}`)
    .pipe(map((resp: any[]) => {
      return resp;
    }));
  }
}
