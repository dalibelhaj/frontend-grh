import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { elementAt } from 'rxjs-compat/operator/elementAt';
import { Candidat } from '../models/candidat.model';
import { Entretien } from '../models/entretien.model';
import { Offre } from '../models/offre.model';
import { CandidatService } from '../services/candidat.service';
import { EntretienService } from '../services/entretien.service';

@Component({
  selector: 'app-calendrier',
  templateUrl: './calendrier.component.html',
  styleUrls: ['./calendrier.component.scss']
})
export class CalendrierComponent implements OnInit {
  selectedValue = Date() ;
  isVisible = false;
  isVisible1 = false;
  validateForm!: FormGroup;
  entretienId:any;
  candidat:Candidat[]=[];
  selectedUser:any;
  offre!:Offre[];



  time: Date | null = null;
  defaultOpenValue = new Date(0, 0, 0, 0, 0, 0);
  entrtien: Entretien[]=[];
  
  datatest !:any;
  test:any;
  newset:any;
  test123:any
  


 


  constructor(private fb: FormBuilder,private entertienServ:EntretienService,private candidatServ:CandidatService) { 
 

    this.validateForm = this.fb.group({
      datentretien:[this.selectedValue, [Validators.required]],
      heur: [this.time, [Validators.required]],
      description: ['', [ Validators.required]],
    });

  }


  selectChange(select: Date): void {
    console.log(`Select value: ${select}`);
    
    this.getEntret()
    this.isVisible=true;
  }

creatEntret():void{
  this.entertienServ.creatEntrtien(this.validateForm.value)
  .subscribe(data => {
    console.log(data);
    this.entretienId=(data.id);
    console.log(this.entretienId);
   
  }, error => console.log(error));
}
getjoin():void{
  this.candidatServ.getAlloffcand()
  .subscribe(
    (data:any): void=>{
      this.offre=data;
      console.log(data);
      console.log(this.candidat);
      
    },
    error => {
      console.log(error);
    });
}

getCand():void{
  this.candidatServ.getOffCandid(this.selectedUser.id)
  .subscribe(
    data=>{
      this.candidat = data.candidats.map((elem:any)=>elem);

      console.log(this.candidat) 

    },
    error => {
      console.log(error);
    });
}

changeData(nembreppost: any) {
  this.selectedUser = nembreppost;
  console.log(this.selectedUser.id)
  this.getCand();

}

creatJoint(id:any){
  this.entertienServ.jointentretien(id,this.entretienId)
    .subscribe(data => {
    
      console.log(data);
 
    }, error => console.log(error));


}

getEntret():void{
  this.entertienServ.getEntretien()
  .subscribe(
    data=>{

      this.entrtien=data;
      
     
      this.datatest=data.filter((element:any) =>new Date(element.datentretien)
      .getMonth()===new Date(this.selectedValue).getMonth());

       this.newset =  this.datatest.map((element:any)=>(element.datentretien));
      
      console.log(this.datatest);
      console.log(this.entrtien);
      console.log(this.newset);
  
    },
    error => {
      console.log(error);
    });
}

shoWdate(date:Date){

  return this.newset.find((element:any) => {
        
      var d = new Date(element);
    
      return d.getDate() === date.getDate();
      
  })}

getAllec():void{
  this.entertienServ.getEnandCand()
  .subscribe(
    data=>{
      this.candidat=data.map(function(element:any) { 

        return element.offre_candidats.map((elem:any)=>elem.candidat)[0];
      
});

      this.test123 = data.map((element:any) => element.datentretien);

      
     console.log(data)
      console.log(this.candidat)
      console.log(this.test123)

    },
    error => {
      console.log(error);
    });
    
}

  ngOnInit(): void {
     this.getEntret()
    this.getAllec()
    //this.getjoin();
  }
  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  handleOk1(): void {
    console.log('Button ok clicked!');
    this.isVisible1 = false;
  }

  handleCancel1(): void {
    console.log('Button cancel clicked!');
    
    this.isVisible1 = false;
  }
  showModal(): void {
    this.isVisible1 = true;
  }
  submitForm():void{
     console.log('submit', this.validateForm.value);
     console.log(this.time);
     console.log('time for this meeting', this.validateForm.value.heur);
    }


    log(time: Date): void {
      console.log(time && time.toTimeString());
    }
    getMonthData(date: Date): number | null {
      if (date.getMonth() === 8) {
        return 1394;
      }
      return null;
    }
    getEvents(index:any, event:any) {
      return event;
    }

    getMonthEvents(month: Date) {
      return this.entrtien.filter(value => {
        return  value.datentretien.getMonth() === month.getMonth();
      });
    }
}

// requestForDate(date: Date): Summary | null {
//    return this.summaryService.summaryForDate(date.getTime());
//    } 
//    public summaryForDate(date: number): Summary { 
//      if (!this.summaries.length) { this.summaries = this.loadSummaries(); } 
//      return this.summaries.find(s => s.date === date); 
//     }

//     private loadSummaries(): Summary[] { 
//       return this.store.getList<Summary>(SUMMARIES); 
//     } 