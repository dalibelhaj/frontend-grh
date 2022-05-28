import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Poste } from '../models/poste.model';

@Injectable({
  providedIn: 'root'
})
export class PosteService {
  private  baseUrl = "http://localhost:8080/api/postes";
  constructor(private http:HttpClient) { }

  getAll(): Observable<Poste[]>  {
    return this.http.get<Poste[]>(this.baseUrl,);
    }
    creatPoste(data:any):Observable<any>{
      return this.http.post(this.baseUrl,data);
    }
}
