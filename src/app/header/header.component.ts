import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  
  constructor( private tokenStorage:TokenStorageService,private router: Router) { }
  isCollapsed = false;
  showit:any;

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


  
  ngOnInit(): void {
    this.canActivate();
  }

}
