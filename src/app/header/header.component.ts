import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  
  constructor( private tokenStorage:TokenStorageService) { }
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



  
  ngOnInit(): void {
    this.canActivate();
  }

}
