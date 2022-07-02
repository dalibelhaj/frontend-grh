import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../services/token-storage.service';
import { UsersService } from '../services/users.service';
import { Roleem } from '../models/roleem.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isCollapsed = false;
  showit:any;
  currentUser: any;
  editForm!:FormGroup;

  
  constructor( private tokenStorage:TokenStorageService,private router: Router,private userService:UsersService,private fb:FormBuilder) {
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


  
  ngOnInit(): void {
    this.currentUser = this.tokenStorage.getUser();

    this.canActivate();
    this. getprofilepic();
    
  }

}
