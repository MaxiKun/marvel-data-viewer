import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiMarvelService {

  private apiUrl: string = 'http://localhost:9001/consumer/api/marvel/getCharacters';

  constructor(private http: HttpClient) { }

  listCharacter(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getCharacter(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}?characterId=${id}`);
  }

}
