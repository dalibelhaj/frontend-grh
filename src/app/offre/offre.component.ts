import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { format, formatISO } from "date-fns";
import { Offre } from '../models/offre.model';
import { OffreService } from '../services/offre.service';
import { isSameMonth } from 'date-fns';
import { Employe } from '../models/employe.model';
import { UsersService } from '../services/users.service';
import { Role } from '../models/role.model';
import { Recrutment } from '../models/recrutment.model';
import { NzCarouselTransformNoLoopStrategy } from 'ng-zorro-antd/carousel';
import { LoginComponent } from '../login/login.component';
import { elementAt } from 'rxjs-compat/operator/elementAt';
import { analyzeAndValidateNgModules } from '@angular/compiler';

@Component({
  selector: 'app-offre',
  templateUrl: './offre.component.html',
  styleUrls: ['./offre.component.scss']
})
export class OffreComponent implements OnInit {
  isVisible = false;
  isVisible2= false;
  isVisible3= false;
  isVisible4= false;
  isVisible6 = false;
  isVisible7= false;
  checked = true;
  offre:Offre[]=[];
  employe:Employe[]=[];
  employee:Employe[]=[];
  employeee:Employe[]=[];
  editForm!: FormGroup;
  offree?: Offre[]=[];
  validateForm!: FormGroup;
  customerObj: any = {};
  nembreppost = [1 , 2 , 3 , 4 , 5 , 6 , 7 , 8 , 9 ];
date = null;
date2 = null;
offreId: any;
  getdate?: any;
  getdate2?: string;
  getdate3?: string;
  getdate4?: string;
  recrutmen:Recrutment[]=[];
 
  listitem:any;
  listitem2:any;
  raw:any;
  deletId: any;
  newdata!: Offre[];
  alert= false;
  click : boolean [] = []  ;
  
 
  
  constructor(private offerService:OffreService,private fb: FormBuilder,private emploiService:UsersService) { 
    this.listitem=[];
    this.listitem = this.employee;

    this.validateForm = this.fb.group({
      titre: ['', [Validators.required]],
      description: ['', [ Validators.required]],
      post: ['', [Validators.required]],
      nembposte: [null, [Validators.required]],
      exigence: ['', [Validators.required]],
      deparoff:['', [Validators.required]],
      finoffre:['', [Validators.required]],
      etat:['en attente',[Validators.required]]
    });
  }

getAlloffre():void{
  this.offerService.getAll()
  .subscribe(
    data => {
      this.offre=data;
      console.log(data);
    },
    error => {
      console.log(error);
    });

}
deleteOffre(id:any):void{
  this.offerService.delete(id)
  .subscribe(
    data=> {
     // this.offre= this.offre.filter(offree=> offree.id !== id);
      console.log(data);
    }
  ),
  console.error();
  
}

creatOffree():void{
  this.offerService.creatOffre(this.validateForm.value)
  .subscribe(data => {
    console.log(data);
    this.offreId=(data.id);
    this.alert=true;
    console.log(this.offreId);
 

   
  }, error => console.log(error));

  

}

retrieveEmploye(): void {
  this.emploiService.getAll()
    .subscribe(
      data => {

        this.employe = data;
        

        console.log(data);
      },
      error => {
        console.log(error);
      });
}
formatRoles(roles: Role[]) {
  return roles.map(role =>role.name).join(", ")
}

getAlljunc(id:any):void{
  this.offerService.getAlljuction(id)
  .subscribe(
    data => {
      this.offreId=(data.id);
      this.employee=(data.employes);
      console.log(data);
      console.log(this.offreId);
      console.log(this.employee);
      this.getduplicater();
    },
    error => {
      console.log(error);
    });
}

creatJointure(id:any) {
  this.offerService.attacheoOffremploiye( id,this.offreId)
    .subscribe(data => {
      this.employe=(data);
      
      console.log(data);
      
 
    }, error => console.log(error));

  

}
addItem(row:any):void{
  this.listitem.push(row)
  
  console.log(row);
}
addItem2(row:any):void{
  this.employee.push(row)
  
  console.log(row);
}
deletItem(row:any):void{
  this.listitem.pop(row)
  
  console.log(row);
}
deletItem2(row:any):void{
  this.employee.splice(row,1)
  
  console.log(row);
}

addtomainrecord(index:any) {
  this.click[index] = true;
}


updateOffre(id:any) {
  this.offerService.update(id, this.editForm.value)
    .subscribe(data => {
      console.log(data);
      
     
    }, error => console.log(error));
}

deletejinct(id:any){
this.offerService.deletejunc(this.offreId,id)
.subscribe(data => {
  console.log(data);
}, error => console.log(error));
}


getduplicater(){

  const test = this.employee.map(({ id }) => id);
  this.employeee = this.employe.filter(({ id }) => !test.includes(id));

  
  console.log(this.employeee);


}

getJuction():void{
  this.offerService.getjuction()
  .subscribe(data => {

    
    var test = data.filter(function(element:any){
   
      return element.employes.map((employe:any)=>employe.recrutements.avis === 'accepter')
      .every((emel:any) => emel === true ) ;
      });

      var test2 = data.filter(function(element:any){
        return element.employes.map((employe:any)=>employe.recrutements.avis === 'refuser')
        .some((emel:any) => emel === true ) ;
      });

     test.map((val:any) =>{
        
        return this.changestat(val.id,val.etat ={etat:"accepter"})
      });

      test2.map((val:any) =>{
        
        return this.changestat(val.id,val.etat ={etat:"refuser"})
      });
     console.log(test2) 
     console.log(test)
     


    
    

  }, error => console.log(error));

}

changestat(id:any,data:any){
  this.offerService.update(id,data)
  .subscribe(data=>{
console.log(data)
  }, error => console.log(error));
}


  ngOnInit(): void {
    this.getAlloffre();
    this.getJuction();
   // this.retrieveEmploye();
   this.editForm = this.fb.group({
    id:[''],
    titre: [''],
    post: [''],
    nembposte: [''],
    exigence: [''],
    deparoff: [''],
    finoffre:[''],
    description:[''],
    etat: ['']
  } );

  }

  showModal(row:any): void {
    this.isVisible = true;
    console.log(row)
    this.offree=[row];
   

  }
  showModal3():void{
    this.isVisible3 = true;
  }

  showDeleteConfirm(data:any):void{
    this.deletId=data.id;
    this.newdata=[data];
    console.log(this.deletId);


    this.isVisible2= true;

  }
  handleOk2(): void {
    console.log('Button ok clicked!');
    this.isVisible2 = false;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }
  handleCancel2(): void {
    console.log('Button cancel clicked!');
    this.isVisible2 = false;
  }

  handleOk3(): void {
    console.log('Button ok clicked!');
    this.isVisible3 = false;
  }

  handleCancel3(): void {
    console.log('Button cancel clicked!');
    this.isVisible3 = false;
  }

  submitForm(): void {
    console.log('submit', this.validateForm.value);
  }

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.validateForm.reset();
    for (const key in this.validateForm.controls) {
      if (this.validateForm.controls.hasOwnProperty(key)) {
        this.validateForm.controls[key].markAsPristine();
        this.validateForm.controls[key].updateValueAndValidity();
      }
    }
  }

  changeCustomer(nembreppost: any) {
    this.customerObj = nembreppost;
  }
  onChange(result: Date): void {
    console.log(  format(result, 'dd-MMM-yy')  ) 
    this.getdate = formatISO(result, { representation: 'date' }) ;
    console.log(  this.getdate ) 
  }
  onChange1(result: Date): void {
    console.log(  format(result, 'dd-MMM-yy')  ) 
    this.getdate2 = formatISO(result, { representation: 'date' }) ;
    console.log(  this.getdate2 ) 
  }
  onChange3(result: Date): void {
    console.log(  format(result, 'dd-MMM-yy')  ) 
    this.getdate3 = formatISO(result, { representation: 'date' }) ;
    console.log(  this.getdate3 ) 
  }
  onChange4(result: Date): void {
    console.log(  format(result, 'dd-MMM-yy')  ) 
    this.getdate4 = formatISO(result, { representation: 'date' }) ;
    console.log(  this.getdate3 ) 
  }
  public disabledDate = (current: Date): boolean => current  <= new Date();
  public disabledDate2 = (): boolean => this.getdate < new Date();

  showModal4(): void {
    this.isVisible4 = true;
  }
  showModal7(): void {
    this.isVisible7 = true;
    this.retrieveEmploye();
    
  }

  handleOk4(): void {
    console.log('Button ok clicked!');
    this.isVisible4 = false;
  }

  handleCancel7(): void {
    console.log('Button cancel clicked!');
   
    this.isVisible7 = false;
  }



  handleOk7(): void {
    console.log('Button ok clicked!');
    this.isVisible7 = false;
  }

  handleCancel4(): void {
    console.log('Button cancel clicked!');
    this.isVisible4 = false;
  }
  showModal6(offre:Offre): void {
    this.isVisible6 = true;
    this.editForm.patchValue( {
      id:offre.id,
      refoffre:offre.refoffre,
      titre: offre.titre,
      post: offre.post,
      nembposte:offre.nembposte,
      exigence: offre.exigence,
      deparoff: offre.deparoff,
      finoffre: offre.finoffre,
      etat:offre.etat,
      description:offre.description
 
    });
  }

  handleOk6(): void {
    console.log('Button ok clicked!');
    this.isVisible6 = false;
  }

  handleCancel6(): void {
    console.log('Button cancel clicked!');
    this.isVisible6 = false;
  }
  reloadCurrentPage() {
    window.location.reload();
   }

}


