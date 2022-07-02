import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Offre } from '../models/offre.model';
import { Recrutment } from '../models/recrutment.model';

@Injectable({
  providedIn: 'root'
})
export class RecrutmentsService {

  private  jinctionUrl = "http://localhost:8080/api/recrutement/"

  constructor(private http:HttpClient) { }

  getAll(id: any): Observable<any>  {
    return this.http.get<Offre>(`${this.jinctionUrl}/offre/${id},`);
  }

  getAllof(id: any): Observable<any>  {
    return this.http.get<Offre>(`${this.jinctionUrl}/employe/${id},`);
  }

  getAlll(): Observable<any>  {
    return this.http.get<Offre>(this.jinctionUrl);
  }

  getOne(id:any,id2:any): Observable<any> {
    return this.http.get(`${this.jinctionUrl}change/${id2}/${id},`);
  }
  update(id: any,id2:any, data: any) {
    return this.http.put(`${this.jinctionUrl}change/${id2}/${id},`,data);
  }
}
