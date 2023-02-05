import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


const SERVER_URL ='http://localhost:8080/api/notification/subscription';
const Not_Url = 'http://localhost:8080/api/notification/sendNotification';


@Injectable({
  providedIn: 'root'
})


export class PushNotificationServiceService {
  private  baseUrl = 'http://localhost:8080/api/notification'
  constructor(private http:HttpClient) { }

  public sendSubscriptionToTheServer(subscription: PushSubscription)  {
    return this.http.post(SERVER_URL, subscription);
  }

  public activnotification(){
    return this.http.post(Not_Url,null);
  }
  getAll(): Observable<any>  {
    return this.http.get(this.baseUrl,);
    }
    creatPoste(data:any):Observable<any>{
      return this.http.post(this.baseUrl,data);
    }

    update(id:any,data:any):Observable<any>  {
      return this.http.put(`${this.baseUrl}/${id}`, data);
      }
}
