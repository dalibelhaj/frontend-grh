import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest  } from '@angular/common/http';
import { Offre } from '../models/offre.model';
import { Observable } from 'rxjs';
import { Employe } from '../models/employe.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class OffreService {


  private  baseUrl = "http://localhost:8080/api/offres";
  private  jinctionUrl = "http://localhost:8080/api/recrutement"

  constructor(private http:HttpClient) { }

  getAll(): Observable<Offre[]>  {
    return this.http.get<Offre[]>(this.baseUrl,);
    }

  getOne(id: any) {
      return this.http.get(`${this.baseUrl}/${id},`);
    }

  delete(id: any) {
      return this.http.delete(`${this.baseUrl}/${id}`);
    }

    creatOffre(data:any):Observable<any>{
      return this.http.post(this.baseUrl,data,httpOptions);
    }

    getAlljuction(id: any): Observable<any>  {
      return this.http.get(`${this.jinctionUrl}/employe/${id}`);
      }

      
      update(id: any, data: any) {
        return this.http.put(`${this.baseUrl}/${id}`, data);
      }


getjuction():Observable<any>{
  return this.http.get<Employe>(this.jinctionUrl);
}

    attacheoOffremploiye(data:any,data2:any):Observable<any> {

        return this.http.post(this.jinctionUrl,{employeId:data , offreId:data2});
      }

      
      deletejunc(id:any,id2:any) {
        return this.http.delete(`${this.jinctionUrl}/change/${id2}/${id}`);
      }
 


}
