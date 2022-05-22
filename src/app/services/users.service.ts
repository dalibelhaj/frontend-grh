import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employe } from '../models/employe.model';
import 'rxjs/add/operator/map'
import 'rxjs/Rx';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

//type EmployeRole = Employe <Role []> ; 

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private  rolessUrl = 'http://localhost:8080/api/roles';
  private  baseUrl = 'http://localhost:8080/api/employes';
  private  fileUrl = 'http://localhost:8080/api/employes/pic'
  private  getfileUrl = 'http://localhost:8080/api/employes/pic/get'

  constructor(private http: HttpClient) { }


  getAll()  {
    return this.http.get<Employe[]>(this.rolessUrl,);
    }



    update(id: any, data: any) {
      return this.http.put(`${this.baseUrl}/${id}`, data);
    }
  
    delete(id: any) {
      return this.http.delete(`${this.baseUrl}/${id}`);
    }
    
  get(id: any) {
    return this.http.get(`${this.baseUrl}/${id},`);
  }

  getFiles(id:any): Observable<any> {
    return this.http.get(`${this.getfileUrl}/${id}`,{ responseType: 'blob' });
  }


  uploadProfileImage(id: any,file: File) {
    const formData: FormData = new FormData();

    formData.append('picture', file);

    const req = new HttpRequest('PUT', `${this.fileUrl}/${id}`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }


  //   return this.http.put<FormData>(`${this.fileUrl}/${id}`,formData);
  // }



  
  
}
