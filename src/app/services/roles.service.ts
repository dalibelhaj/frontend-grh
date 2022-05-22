import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Role } from '../models/role.model';

const API_URL = 'http://localhost:8080/api/employes';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  constructor(private http:HttpClient) { }
  getAll(): Observable<Role[]> {
    return this.http.get<Role[]>(API_URL,httpOptions);
  }
  
}
