import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class EntretienService {

  private  baseUrl = "http://localhost:8080/api/entretiens";
  private jointUrl = "http://localhost:8080/api/fixe_entretien"

  constructor(private http:HttpClient) { }

  creatEntrtien(data:any):Observable<any>{
    return this.http.post(this.baseUrl,data,httpOptions);
  }
jointentretien(id:any,id2:any):Observable<any>{
  return this.http.post(this.jointUrl,{offreCandidatCandidatId:id,entretienId:id2})
}

getEntretien():Observable<any>{
  return this.http.get(this.baseUrl)
}

getEnandCand():Observable<any>{
  return this.http.get(this.jointUrl)
}

}
