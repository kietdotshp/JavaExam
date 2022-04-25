import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IQuestion } from './question';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  url = 'http://localhost:9090/api/public/questions';

  constructor(private http: HttpClient) {  }

  getQuestion(): Observable<any>{
    return this.http.get<any>(this.url);
  }

}
