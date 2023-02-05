import { Component, OnInit,TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../services/token-storage.service';
import { UsersService } from '../services/users.service';
import { Roleem } from '../models/roleem.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import  io from 'socket.io-client';
import { PushNotificationServiceService } from '../services/push-notification-service.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Notificationmodel } from '../models/notification.model';
import { Subject } from 'rxjs';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @ViewChild(TemplateRef, { static: false }) template?: TemplateRef<{}>;

  isCollapsed = false;
  showit:any;
  currentUser: any;
  editForm!:FormGroup;

  socket: any;
  notifdata: any;

  notifnumber:any
  datafromnotif:Notificationmodel []=[]



  messageId: string | undefined;
  onClose!: Subject<boolean> ; // It would emit an event when the notification is closed, and emit a `true` if it's closed by user
  onClick?: Subject<MouseEvent> ;

  constructor( private tokenStorage:TokenStorageService,
    private router: Router,private userService:UsersService,
    private fb:FormBuilder,
    private notifservice:PushNotificationServiceService,
    private notificationService: NzNotificationService) {



    this.editForm = this.fb.group({
      id:['',[Validators.required]],
      utilisateur: ['',[Validators.required]],
      login: ['',[Validators.required]],
      post: ['',[Validators.required]],
      action: ['',[Validators.required]],
      mail: ['',[Validators.required]],
      picture:[null],
      password:['']
     
    } ); 

    this.socket = io('http://localhost:8080');
    this.datafromnotif=[];
    this.notifnumber=[];
    
   }


  canActivate(): void{
    if(this.tokenStorage.getToken()){
      this.showit=true;
      console.log(this.showit)
    }else {
      this.showit=false;
    }
      
    }

    logout() {
      this.tokenStorage.signOut();
      this.router.navigate(['offre']);
   
        window.location.reload();
   
    }

    getprofilepic() :void {
      this.userService.get(this.currentUser.id)
      .subscribe(
        (employe:Roleem) =>{
          this.editForm.patchValue({
            id:employe.id,
            mail: employe.mail, 
            utilisateur: employe.utilisateur,
            login: employe.login,
            post: employe.post,
            action: employe.action,
            picture:employe.picture,
            password:employe.password
          });
      },
      error => {
        console.log(error);
      })
    }


  getnotiff(){
    this.notifservice.getAll()
    .subscribe(
      data => {
        
        var datanot=data.filter((value:any )=> value.userId === this.currentUser.id);
        this.datafromnotif=datanot.filter((value:any )=> value.statsofnot === 1).reverse();
      this.notifnumber = this.datafromnotif.length
      
      
      },
      error => {
        console.log(error);
      });
  }
  ngOnInit(): void {
    this.currentUser = this.tokenStorage.getUser();

    this.canActivate();
    this. getprofilepic();

    if(this.tokenStorage.getToken()){
      this.connectsocket();
      this.connectsocket2();
      }
      this.connectsoso();
      this.getnotiff();

     
    
  }

  connectsocket(){
    this.currentUser = this.tokenStorage.getUser();
    this.socket.on('notification', (data: any) => {
      
      this.notifdata = data;
        this.datafromnotif.push(this.notifdata);
        this.notifnumber += 1 ;
        console.log(this.notifnumber);
      
      
    //   if(data.id===this.currentUser.id){
    // }
    })
  }

  connectsocket2(){
    this.currentUser = this.tokenStorage.getUser();
    this.socket.on('notificationavis', (data: any) => {
      
      this.notifdata = data;
        this.datafromnotif.push(this.notifdata);
        this.notifnumber += 1 ;
        console.log(this.notifnumber);
      
      
    //   if(data.id===this.currentUser.id){
    // }
    })
  }
  
  connectsoso(){
    this.socket.on('connect',  (data:any) => {
      this.socket.emit('storeClientInfo', { customId:this.currentUser.id });
    })
  }


  createBasicNotification(template: TemplateRef<{}>): void {
    
    this.datafromnotif.forEach(datafromnotif=> {
    this.notificationService.template(template,{nzData:datafromnotif,nzDuration: 0});
    
    });
  
    
  }

  onCancel(id:any): void {
    console.log("close :" ,id);
   
      this.notifservice.update(id,{statsofnot:0})
        .subscribe(data => {
          console.log(data);
          
         
        }, error => console.log(error));

    
   
}

    deletfromnot(id:any): void {
      // console.log(this.datafromnotif);
      // for (let i = 0; i < this.datafromnotif.length; i++){
 
      //   if (this.datafromnotif[i].id==id){

      //    console.log(i)
      //    this.datafromnotif = this.datafromnotif.splice(i);
      
      //   break;
      //   } 
         
      //    }
    
      //    console.log(this.datafromnotif);
      this.datafromnotif =this.datafromnotif.filter(value => value.id != id);
      this.notifnumber -= 1 ;
      console.log(this.datafromnotif)
    }
 

}
