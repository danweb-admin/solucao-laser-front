import { StickyNotes } from './../models/stickyNotes';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const URL_STICKYNOTES = '/api/v1/sticky-notes';

@Injectable({
  providedIn: 'root'
})
export class StickyNotesService {
  
  constructor(private http: HttpClient){
  }

  loadStickyNotes(date: string): Observable<StickyNotes[]> {
    return this.http.get(`${environment.URL_API}${URL_STICKYNOTES}/?date=${date}`)
    .pipe(map((resp: StickyNotes[]) => {
      return resp;
    }));
  }

  save(stickyNotes: StickyNotes): Observable<StickyNotes>{
    
    return this.http.post(`${environment.URL_API}${URL_STICKYNOTES}`,stickyNotes)
    .pipe(map((resp: StickyNotes) => {
      return resp;
    }));
  }

  updateResolved(stickyNotesId: string): Observable<StickyNotes> {
    return this.http.put(`${environment.URL_API}${URL_STICKYNOTES}/update-resolved/${stickyNotesId}`, null)
    .pipe(map((resp: StickyNotes) => {
      return resp;
    }));
  }

  remove(stickyNotesId: string): Observable<StickyNotes> {
    return this.http.put(`${environment.URL_API}${URL_STICKYNOTES}/remove/${stickyNotesId}`, null)
    .pipe(map((resp: StickyNotes) => {
      return resp;
    }));
  }

  update(stickyNotes: StickyNotes): Observable<StickyNotes>{
    return this.http.put(`${environment.URL_API}${URL_STICKYNOTES}/${stickyNotes.id}`,stickyNotes)
    .pipe(map((resp: StickyNotes) => {
      return resp;
    }));
  }
}
