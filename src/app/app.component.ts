import { Component, OnInit } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { PushNotificationServiceService } from './services/push-notification-service.service';
import { TokenStorageService } from './services/token-storage.service';
import  io from 'socket.io-client';

const VAPID_PUBLIC = 'BNNDw8wSxxvqMJrrxUH9fFx-QAoo1iUr70Y6ixPqSFqo40Bk79h1g3-YczYKDf4l6H9Yb7_8ObHwtXVazvwzlAA';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  isCollapsed = false;
  socket: any;
  data: any;
  currentUser: any;
  constructor (swPush: SwPush,private pushService:PushNotificationServiceService,private tokenStorage:TokenStorageService){

    this.socket = io('http://localhost:8080');

    if (swPush.isEnabled) {
      swPush
        .requestSubscription({
          serverPublicKey: VAPID_PUBLIC
        })
        .then(subscription => {
          pushService.sendSubscriptionToTheServer(subscription).subscribe();
        })
        .catch(console.error);
    }
    
  }

  testnotif(){
this.pushService.activnotification()
.subscribe(data => {
  console.log(data);
 
 
}, error => console.log(error));

  }
  ngOnInit(): void{
    // if(this.tokenStorage.getToken()){
    // this.connectsocket();
    // }
    // this.connectsoso();
  }


socketiotest (){
  this.socket.emit('notification',{id :2,data:"test"});
}

connectsocket(){
  this.currentUser = this.tokenStorage.getUser();
  this.socket.on('notification', (data: any) => {
    
    this.data = data;
  //   if(data.id===this.currentUser.id){
  // }
  });
}

connectsoso(){
  this.socket.on('connect',  (data:any) => {
    this.socket.emit('storeClientInfo', { customId:this.currentUser.id });
  })
}

  }


 

