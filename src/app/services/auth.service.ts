import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:8080/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(login: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'signin', {
      login,
      password
    }, httpOptions);
  }

  register( utilisateur:string, login:string, mail:string, post:string, action:string, password:string, roles:string): Observable<any> {
    return this.http.post(AUTH_API + 'signup', {
      utilisateur,
      login,
      mail,
      post,
      action,
      password,
      roles
    }, httpOptions);
  }
}
