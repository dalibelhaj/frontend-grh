import { Component, OnInit } from '@angular/core';
import { Offre } from '../models/offre.model';
import { RecrutmentsService } from '../services/recrutments.service';
import { TokenStorageService } from '../services/token-storage.service';
import { Observable, Observer } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Recrutment } from '../models/recrutment.model';
import { variable } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss']
})
export class ActionComponent implements OnInit {

  currentUser: any;
  offre: Offre[]=[];
  offree?: Offre[]=[];
  offreee?: Offre[]=[];
  isVisible=false;
  isVisible2=false;
  editForm!: FormGroup;
  customerObj: any = {};
  nembreppost = ['accepter' , 'refuser', 'en attente' ];
  rowcolor:any;
  accepter : boolean []=[];
  refuser: boolean []=[];
  


  constructor(private token:TokenStorageService,private recrutmentServ:RecrutmentsService,private fb:FormBuilder) { 
    this.editForm = this.fb.group({
      avis:['',[Validators.required]],
      ttp: ['',[Validators.required]],
     
    } ); 
  }


  getAlljuct():void{
    
    this.recrutmentServ.getAll(this.currentUser.id)
    .subscribe(data => {

      this.offre = (data.offres);

      var test = this.rowcolor= this.offre.map(function(val ){
        return val.recrutements
      });
       this.accepter = test.map(function (val:any) {
        return val.avis ==='accepter'

        });
        this.refuser = test.map(function (val:any) {
          return val.avis ==='refuser'
  
          });

        // this.rowcolor  = test.map(function (val:any) {
        //   return val.avis 
  
        //   });

      console.log(data);
      console.log(this.accepter);
      console.log(this.rowcolor);

      

      },
      error => {
        console.log(error);
      });
    
      }

    


      getOnejunc(id2:any):void{
        this.recrutmentServ.getOne(this.currentUser.id,id2)
        .subscribe(
        (recrutment:Recrutment )=> {
        this.editForm.patchValue({
         avis:recrutment.avis,
         ttp: recrutment.ttp, 
         });
      console.log(recrutment)
    },
    error => {
      console.log(error);
    });
      }

      updateJuction(id2:any) {
        this.recrutmentServ.update(this.currentUser.id,id2, this.editForm.value)
          .subscribe(data => {
            console.log(data);
         
           
          }, error => console.log(error));
      }

      

      
  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.getAlljuct();
    
    

  }
  showModal(row:any): void {
    this.isVisible = true;
    console.log(row)
    this.offree=[row];
   

  }
  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }
  showModal2(row:any): void {
    this.isVisible2 = true;
    this.offreee=[row];

   

  }
  handleOk2(): void {
    console.log('Button ok clicked!');
    this.isVisible2 = false;
  }

  handleCancel2(): void {
    console.log('Button cancel clicked!');
    this.isVisible2 = false;
  }
  changeCustomer(nembreppost: any) {
    this.customerObj = nembreppost;
  }
  reloadCurrentPage() {
    window.location.reload();
   }
}
