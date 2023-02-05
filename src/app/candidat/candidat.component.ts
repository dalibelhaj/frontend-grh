import { Component, OnInit } from '@angular/core';
import { Candidat } from '../models/candidat.model';
import { CandidatService } from '../services/candidat.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { TestBed } from '@angular/core/testing';
import { Offre } from '../models/offre.model';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { TokenStorageService } from '../services/token-storage.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EntretienService } from '../services/entretien.service';

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
  affichage:Candidat[]=[];
  id!: any;
  id2!: any;
  id1!: any;
  id3!: any;
  validateForm!: FormGroup;
  size: NzButtonSize = 'large';
  time: Date | null = null;

  baseUrl='http://localhost:8080'
  selectedUser :any;
  isLoading = false;

  isVisible=false;
  isVisible1=false;
  currentUser: any;
  selectedValue = Date() ;
  defaultOpenValue = new Date(0, 0, 0, 0, 0, 0);
  entretienId:any;


  constructor(private candidatServ:CandidatService,private token:TokenStorageService,private fb:FormBuilder,private entrServic:EntretienService) { 

    this.validateForm = this.fb.group({
      datentretien:['', [Validators.required]],
      heur: [this.time, [Validators.required]],
      description: ['', [ Validators.required]],
    });


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
  this.currentUser = this.token.getUser();
  this.selectedUser = nembreppost;
  console.log(this.selectedUser.id)
  this.getCand();
  this.getCandatt();
  this.getCandatentretien();
  this.getCandataccpter();
}
creatEntret():void{
  this.entrServic.creatEntrtien(this.validateForm.value)
  .subscribe(data => {
    console.log(data);
    this.entretienId=(data.id);

    console.log(this.entretienId);
   
  }, error => console.log(error));
}

createentretien(){
  this.entrServic.jointentretien(this.id2,this.entretienId)
  .subscribe(data => {
    
    console.log(data);

  }, error => console.log(error));
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

    this.id2 = this.entretien.map((exemp:any)=>exemp.id)[event.currentIndex];
    console.log(this.id2);
   
    this.id3 = this.accepter.map((exemp:any)=>exemp.id)[event.currentIndex];
    console.log(this.id3);
    }
 
  }
  Testsed():void{
    console.log("nouveau")
    this.sendnouveau()
  }

  Testsed2():void{
    this.sendentretien()
    console.log("send entretien ")
    this.showModal1();
  }

  Testsed1():void{
    this.sendetudien();
    console.log("en attente req envoiyer avec succes")
  }

  Testsed3():void{
    console.log("accepted ")
    this.sendaccepted()
  }


  sendnouveau():void{
    this.candidatServ.updateSatat(this.id1,{"statut":null})
    .subscribe(data => {
      console.log(data);
      
     
    }, error => console.log(error));
  }

sendetudien():void{
  
 this.candidatServ.updateSatat(this.id,{"statut":"en attente"})
      .subscribe(data => {
        console.log(data);
        
       
      }, error => console.log(error));

}

sendentretien():void{
  this.candidatServ.updateSatat(this.id2,{"statut":"entretien"})
  .subscribe(data => {
    console.log(data);
    
   
  }, error => console.log(error));

}

sendaccepted():void{
  this.candidatServ.updateSatat(this.id3,{"statut":"accepter"})
  .subscribe(data => {
    console.log(data);
  }, error => console.log(error));
}
showModal(row:any): void {
  this.isVisible = true;
  console.log(row)
    this.affichage=[row];
}

handleOk(): void {
  console.log('Button ok clicked!');
  this.isVisible = false;
}

handleCancel(): void {
  console.log('Button cancel clicked!');
  this.isVisible = false;
}

downloadMyFile(){
  const link = document.createElement('a');
  link.setAttribute('target', '_blank');
  link.setAttribute('href', `${this.baseUrl}/${this.affichage.map(val => val.cv)}`);
  link.setAttribute('download', `Cv.pdf`);
  document.body.appendChild(link);
  link.click();
  link.remove();
}


showModal1(): void {
  this.isVisible1 = true;
 
    
}

handleOk1(): void {
  this.creatEntret();
  console.log('Button ok clicked!');

  setTimeout(() => {
    this.createentretien();
  },1000)
  
  this.isVisible1 = false;

  
}

handleCancel1(): void {
  console.log('Button cancel clicked!');
  this.isVisible1 = false;
}

submitForm(){

}
selectChange(select: Date): void {
  console.log(`Select value: ${select}`);
}
log(time: Date): void {
  console.log(time && time.toTimeString());
}

}
