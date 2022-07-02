import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { Chart } from '@antv/g2';
import { Candidat } from '../models/candidat.model';
import { Entretien } from '../models/entretien.model';
import { Fixentretien } from '../models/fixentretien.model';
import { OffreCandidats } from '../models/offre-candidats.model';
import { Offre } from '../models/offre.model';
import { CandidatService } from '../services/candidat.service';
import { EntretienService } from '../services/entretien.service';
import { OffreService } from '../services/offre.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None
})


export class DashboardComponent implements OnInit {

  offre:any;
  offnember: number | undefined;
  offreacpted: Offre[]=[];
  approuvnember: number | undefined;
  candidat: Candidat[]=[];
  candidatnumber: number | undefined;
  entretien: Entretien[]=[];
  entrtiennumber: number | undefined;
  newset: Entretien[]=[];
  fixentretien:Fixentretien[]=[];
  curentdate: Date | undefined;

  
 

  constructor(private offreService:OffreService,
    private candidatService:CandidatService,
    private entretienService:EntretienService) {}
  
  onValueChange(value: Date): void {
    console.log(`Current value: ${value}`);
    this.curentdate=value;
    this.getdetails(value)
  }

  onPanelChange(change: { date: Date; mode: string }): void {
    console.log(`Current value: ${change.date}`);
    console.log(`Current mode: ${change.mode}`);
  }

  getOffre():void{
    this.offreService.getAll()
    .subscribe(data=>{

      
      this.offnember = data.length

      // this.offre = data.map(function(value:any){
      //   return {
      //     ref:value.description,
      //     nombre:value.id
      //   };
      // });
      // console.log(this.offre)

      
    },
    error => {
      console.log(error);
    });
  }

 creatchart():void{
  this.candidatService.getAlloffcand()
  .subscribe(data=>{
var newdata = data.filter((value:any)=>value.candidats.length !=0);

    let description = data.map((res:any)=>`Ref: ${res.id}`);
    // let candidats = data.map((res:any)=> res.candidats.length);


       var   data2 = newdata.map(function(value:any){
        
        return {
          ref:`Ref: ${value.id}`,
          nombre:value.candidats.length
        };
      });

  
    const chart = new Chart({
      container: 'c1',
      autoFit: true,
      width: 600,
      height: 300,
    });

   
    chart.data( data2);

    chart.scale('ref', {
      alias: description,
      nice: true,
    });
    chart.axis('nombre', {
      tickLine: null
    });

    // Step 3：Declare the grammar of graphics, draw column chart.
    chart.interval().position('ref*nombre');

    // Step 4: Render chart.
    chart.render();
    
  },
  error => {
    console.log(error);
  });
 }

  getJuction():void{
    this.offreService.getjuction()
    .subscribe(data => { 
      this.offreacpted = data.filter((value:any) =>value.etat === 'accepter') ;
       this.approuvnember= this.offreacpted.length
       
    }, error => console.log(error));
  
  }

  getcandidat():void{
    this.candidatService.getAll()
    .subscribe(data=>{
      this.candidat=data;
      this.candidatnumber=this.candidat.length
    },
    error => console.log(error))
  }

  getentretien():void{
    this.entretienService.getEntretien()
    .subscribe(data=>{
      this.entretien=data;
      this.entrtiennumber=this.entretien.length
      this.newset =  data.map((element:any)=>(element.datentretien));
      console.log(this.entretien);
    },error => console.error(error))
  }
  getdetails(select:any):void{
    this.entretienService.getEnandCand()
    .subscribe(
      data=>{
        this.fixentretien=data.filter((element:any) =>(new Date(element.datentretien).getDate()===new Date(select).getDate())&&(new Date(element.datentretien).getMonth()===new Date(select).getMonth()) );
       console.log(this.fixentretien)
  
  
      },
      error => {
        console.log(error);
      });
      
  }

  ngOnInit(): void {
    
    this.getOffre();
    this.getJuction();
    this.getcandidat();
    this.getentretien();
    this.creatchart();
    this.getdetails(this.curentdate);
   
  }
  shoWdate(date:Date){

    return this.newset.find((element:any) => {
          
        var d = new Date(element);
      
        return d.getDate() === date.getDate();
        
    })}
  test(){}

  formatRoles(offre_candidats: OffreCandidats[]) {
    var p = offre_candidats.map(valeur =>valeur.candidat)
    return p.map((val:any) => val.nom).join(", ")
    
   
   }

}
