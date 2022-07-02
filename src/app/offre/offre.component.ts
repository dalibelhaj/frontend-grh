import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { format, formatISO } from "date-fns";
import { Offre } from '../models/offre.model';
import { OffreService } from '../services/offre.service';
import { Employe } from '../models/employe.model';
import { UsersService } from '../services/users.service';
import { Role } from '../models/role.model';
import { Recrutment } from '../models/recrutment.model';
import { NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { Poste } from '../models/poste.model';
import { PosteService } from '../services/poste.service';
import { RecrutmentsService } from '../services/recrutments.service';
import { TokenStorageService } from '../services/token-storage.service';
import { NzMessageService } from 'ng-zorro-antd/message';




interface ColumnItem {
  name: string;
  sortOrder: NzTableSortOrder | null;
  sortFn: NzTableSortFn<Offre> | null;
  listOfFilter: NzTableFilterList;
  filterFn: NzTableFilterFn<Offre> | null;
  filterMultiple: boolean;
  sortDirections: NzTableSortOrder[];
}

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
  customerObj2:any = {};
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
  
  searchValue = '';
  visible = false;
  visible1 = false;
  listOfDisplayData :any;

  size: NzButtonSize = 'large';

  poste:Poste[]=[];
  alert2= false;
  postimpty:any;

  listOfControl: Array<{ id: number; controlInstance: string }> = [];

  listOfColumns: ColumnItem[] = [
    {
      name: 'etat',
      sortOrder: null,
      sortFn: (a: Offre, b: Offre) => a.etat.localeCompare(b.etat),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      listOfFilter: [
        { text: 'Accepter', value: 'accepter' },
        { text: 'En attente', value: 'en attente' },
        { text: 'Refuser', value: 'refuser' }
      ],
      filterFn: (list: string[], item: Offre) => list.some(etat => item.etat.indexOf(etat) !== -1)
    },

  ];
  switchValue = false;

  currentUser: any;

  offreee?: Offre[]=[];
  isVisible8=false;
  isVisible9=false;
  editForm2!: FormGroup;
  customerObj3: any = {};
  nembreppost3 = ['accepter' , 'refuser', 'en attente' ];
  rowcolor:any;
  accepter : boolean []=[];
  refuser: boolean []=[];
  offrearray:Offre[]=[];
  
  loading = false;
  process: Employe[]=[];
  offreidspes: Offre[]=[];

  
  constructor(private offerService:OffreService,private fb: FormBuilder,private emploiService:UsersService,private postService:PosteService,private recrutmentServ:RecrutmentsService,private token:TokenStorageService,private message: NzMessageService,private recrutService:RecrutmentsService) { 
    this.listitem=[];
    this.listitem = this.employee;
    

    this.validateForm = this.fb.group({
      titre: ['', [Validators.required]],
      description: ['', [ Validators.required]],
      post: ['', [Validators.required]],
      nembposte: [null, [Validators.required]],
      competence: ['',[Validators.required]],
      deparoff:['', [Validators.required]],
      finoffre:['', [Validators.required]],
      etat:['en attente',[Validators.required]]
    });

    this.editForm2 = this.fb.group({
      avis:['',[Validators.required]],
      ttp: ['',[Validators.required]],
     
    } ); 

  

  }

getAllposte():void{
  this.postService.getAll()
  .subscribe(
    data => {
      this.poste = data.reverse();
      console.log(this.poste)
    },
    error => {
      console.log(error);
    });
}

getAlloffre():void{
  this.offerService.getAll()
  .subscribe(
    data => {
      this.offre=data.reverse();
      console.log(data);
      this.listOfDisplayData = [...this.offre];
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

ajoutPoste():void{
  this.postService.creatPoste( { nomposte : this.postimpty})
  .subscribe(data => {
this.alert2=true;
    console.log(data);
    
  }, error => console.log(error));
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

      var test3 =data.filter(function(element:any){
        return element.employes.length === 0 ;
      })

     test.map((val:any) =>{
        
        return this.changestat(val.id,val.etat ={etat:"accepter"})
      });

      test2.map((val:any) =>{
        
        return this.changestat(val.id,val.etat ={etat:"refuser"})
      });
    
      test3.map((val:any)=>{
        return this.changestat(val.id,val.etat ={etat:"en attente"})
      })


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

getAlljuct():void{
    
  this.recrutmentServ.getAll(this.currentUser.id)
  .subscribe(data => {

    this.offrearray = (data.offres);

    var test = this.rowcolor= this.offre.map(function(val ){
      return val.recrutements
    });
     this.accepter = test.map(function (val:any) {
      return val.avis ==='accepter'

      });
      this.refuser = test.map(function (val:any) {
        return val.avis ==='refuser'

        });

      var attente = test.map(function (val:any) {
        return val.avis ==='en attente'
      });






    console.log(data);
    console.log(this.offrearray);

    

    },
    error => {
      console.log(error);
    });
  
    }

    condAvis(id:any){
  
     return this.offrearray.find(valeur =>valeur.id === (id));   
     
    }

    getrectrutment(id:any):void{
     
      this.recrutService.getAllof(id)
      .subscribe(data=>{
        this.process = data['employes'].map((value:any) =>value);
       console.log(this.process)
      })
    }

    formatRecrutment(recrutements: Recrutment) {

      return recrutements.avis;
    }

  ngOnInit(): void {

    
      this.currentUser = this.token.getUser();
      this.getAlljuct();
    this.getAlloffre();
    this.getJuction();
    this.addField();
    
   // this.retrieveEmploye();
   this.editForm = this.fb.group({
    id:[''],
    titre: [''],
    post: [''],
    nembposte: [''],
    competence: [''],
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
    this.getAllposte();
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

  changeCustomer2(nembreppost: any) {
    this.customerObj2 = nembreppost;
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

  showModal4(row:any): void {
    this.isVisible4 = true;
    this.offreidspes = [row]
    console.log(row)
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
      competence: offre.competence,
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

   reset(): void {
    this.searchValue = '';
    this.search();
  }

   search(): void {
    this.visible = false;
    this.listOfDisplayData = this.offre.filter((item: Offre) => item.titre.indexOf(this.searchValue) !== -1);
  }
  reset2(): void {
    this.postimpty = '';

  }



      getOnejunc(id2:any):void{
        this.recrutmentServ.getOne(this.currentUser.id,id2)
        .subscribe(
        (recrutment:Recrutment )=> {
        this.editForm2.patchValue({
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
        this.recrutmentServ.update(this.currentUser.id,id2, this.editForm2.value)
          .subscribe(data => {
            console.log(data);
         
           
          }, error => console.log(error));
      }

      showModal9(row:any): void {
        this.isVisible9 = true;
        this.offreee=[row];
    
       
    
      }
      handleOk9(): void {
        console.log('Button ok clicked!');
        this.isVisible9 = false;
      }
    
      handleCancel9(): void {
        console.log('Button cancel clicked!');
        this.isVisible9 = false;
      }

      changeCustomer3(nembreppost: any) {
        this.customerObj3 = nembreppost;
      }

      createMessage(type: string): void {
        this.message.create(type,`Mise à jour réussie. `);
      }

      addField(e?: MouseEvent): void {
        if (e) {
          e.preventDefault();
        }
        const id =
          this.listOfControl.length > 0
            ? this.listOfControl[this.listOfControl.length - 1].id + 1
            : 0;
    
        const control = {
          id,
          controlInstance: `passenger${id}`,
        };
        const index = this.listOfControl.push(control);
        console.log(this.listOfControl[this.listOfControl.length - 1]);
        this.validateForm.addControl(
          this.listOfControl[index - 1].controlInstance,
          new FormControl(null, Validators.required)
        );
      }
    
      removeField(i: { id: number; controlInstance: string }, e: MouseEvent): void {
        e.preventDefault();
        if (this.listOfControl.length > 1) {
          const index = this.listOfControl.indexOf(i);
          this.listOfControl.splice(index, 1);
          console.log(this.listOfControl);
          this.validateForm.removeControl(i.controlInstance);
        }
      }
    


}


