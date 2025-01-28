import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Hero } from '../Interfaces/hero';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class HeroService {
  API_URL = 'https://heros-vjc9.onrender.com/api/heros';​

  constructor(private http: HttpClient) { }​​

  getHeros(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.API_URL);  ​
  }

  addHero(hero:Hero): Observable<void> {
    return this.http.post<void>(this.API_URL, hero, httpOptions);
  }

}
