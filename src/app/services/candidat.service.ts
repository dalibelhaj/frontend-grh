import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Offre } from '../models/offre.model';

@Injectable({
  providedIn: 'root'
})
export class CandidatService {

  private  baseUrl = "http://localhost:8080/api/candidats";
  private  joinUrl = "http://localhost:8080/api/offre-candidat"
  

  constructor(private http:HttpClient) { }

  postCandidat(data:any): Observable<any>  {

    return this.http.post(this.baseUrl,data);
    }

    getAll():Observable<any>{
      return this.http.get(this.baseUrl);
    }


  attacheoOffrCandi(data:any,data2:any):Observable<any> {

    return this.http.post(this.joinUrl,{CandidatId:data , OffreId:data2});
  }

  upload(formData: FormData): Observable<any> {
   
    const req = new HttpRequest('POST', this.baseUrl, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  getOffCandid(id:any):Observable<any>{
return this.http.get(`${this.joinUrl}/candidat/${id}`);
  }
getAlloffcand():Observable<any>{
  return this.http.get(this.joinUrl);
}

updateSatat(id:any,data:any):Observable<any>{
  return this.http.put(`${this.baseUrl}/${id}`, data);
}



}
