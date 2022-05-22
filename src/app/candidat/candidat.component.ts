import { Component, OnInit } from '@angular/core';
import { Candidat } from '../models/candidat.model';
import { CandidatService } from '../services/candidat.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { TestBed } from '@angular/core/testing';
import { Offre } from '../models/offre.model';

@Component({
  selector: 'app-candidat',
  templateUrl: './candidat.component.html',
  styleUrls: ['./candidat.component.scss']
})
export class CandidatComponent implements OnInit {
  nouveau:Candidat[]=[];
  etudier:Candidat[]=[] ;
  entretien:Candidat[]=[];
  accepter:Candidat[]=[];
  offre!:Offre[] ;
  candidat!:Candidat;
  id!: any;
  id2!: any;
  id1!: any;
  id3!: any;




  selectedUser :any;
  isLoading = false;

  constructor(private candidatServ:CandidatService) { 


  }

  getCand():void{
    this.candidatServ.getOffCandid(this.selectedUser.id)
    .subscribe(
      data=>{
        this.nouveau = data.candidats.filter((element:any)=>element.statut ===null);

        console.log(this.nouveau) 

      },
      error => {
        console.log(error);
      });
  }


getCandatt():void{
  this.candidatServ.getOffCandid(this.selectedUser.id)
  .subscribe(
    data=>{

this.etudier= data.candidats.filter((element:any)=>element.statut ==='en attente');

console.log(this.etudier);

  },
  error => {
    console.log(error);
  });
}

getCandatentretien():void{
  this.candidatServ.getOffCandid(this.selectedUser.id)
  .subscribe(
    data=>{

this.entretien= data.candidats.filter((element:any)=>element.statut ==='entretien');

console.log(this.entretien);

  },
  error => {
    console.log(error);
  });
}

getCandataccpter():void{
  this.candidatServ.getOffCandid(this.selectedUser.id)
  .subscribe(
    data=>{

this.accepter= data.candidats.filter((element:any)=>element.statut ==='accepter');

console.log(this.accepter);

  },
  error => {
    console.log(error);
  });
}

getjoin():void{
  this.candidatServ.getAlloffcand()
  .subscribe(
    (data:any): void=>{
      //this.offre = data.map((offre:any)=> `${offre.titre} --- Ref: ${offre.id}`);
      // this.offre  = data.map((offre:any)=> offre!.titre);
      this.offre=data;
      console.log(this.offre);
      
    },
    error => {
      console.log(error);
    });
}
changeData(nembreppost: any) {
  this.selectedUser = nembreppost;
  console.log(this.selectedUser.id)
  this.getCand();
  this.getCandatt();
  this.getCandatentretien();
  this.getCandataccpter();
}



  ngOnInit(): void {

    this.getjoin();
    
   
  }

  drop(event: CdkDragDrop<any>) {
  
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,   
      );
      
      this.id = this.etudier.map((exemp:any)=>exemp.id)[event.currentIndex];
    console.log(this.id);
   
    this.id1 = this.nouveau.map((exemp:any)=>exemp.id)[event.currentIndex];
    console.log(this.id1);

    this.id2 = this.etudier.map((exemp:any)=>exemp.id)[event.currentIndex];
    console.log(this.id2);
   
    this.id3 = this.nouveau.map((exemp:any)=>exemp.id)[event.currentIndex];
    console.log(this.id3);
    }
 
  }
  Testsed():void{
    console.log("working")
  }

  Testsed2():void{
    console.log("working2 ")
  }

  Testsed1():void{
    this.sendetudien();
    console.log("en attente req envoiyer avec succes")
  }

  Testsed3():void{
    console.log("working2 ")
  }

sendetudien():void{
  
 this.candidatServ.updateSatat(this.id,{"statut":"en attente"})
      .subscribe(data => {
        console.log(data);
        
       
      }, error => console.log(error));

}


}
