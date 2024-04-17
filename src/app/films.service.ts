import { Injectable, Input } from '@angular/core';
import { FilmsModel } from './films_model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FilmsService {
  url = 'http://localhost:3000/films/';

  editedfilm!: number;

  constructor(private http: HttpClient) {}

  getFilmsFromApi(): Observable<FilmsModel[]> {
    return this.http.get<FilmsModel[]>(this.url);
  }

  getFilmsById(id: number) {
    console.log('Id ne servis: ' + id);

    return this.http.get<FilmsModel>(this.url + id);
  }

  editFilm(id: string, body: string) {
    return this.http.put<FilmsModel[]>(this.url + id, body);
  }

  deleteFilm(id: any) {
    return this.http.delete<FilmsModel[]>(this.url + id);
  }

  createFilm(body: any) {
    return this.http.post<FilmsModel[]>(this.url, body);
  }

  getFilmByCategory(category: string) {
    return this.http.get<FilmsModel[]>(this.url + '?category=' + category);
  }
}
