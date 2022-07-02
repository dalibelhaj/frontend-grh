import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators,FormArray } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';
import { Observable, Observer } from 'rxjs';
import { Candidat } from '../models/candidat.model';
import { Employe } from '../models/employe.model';
import { Offre } from '../models/offre.model';
import { Recrutment } from '../models/recrutment.model';
import { CandidatService } from '../services/candidat.service';
import { OffreService } from '../services/offre.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  offre:Offre[]=[];
  candidat:Candidat[]=[];
  result:any;
  result2:any;
  isVisible = false;
  validateForm!: FormGroup;
  listOfControl: Array<{ id: number; controlInstance: string }> = [];
  listOfControl2: Array<{ id2: number; controlInstance2: string }> = [];
  candidatId:any;
  selectedFiles!: FileList;
  currentFile!: File ;
  progress = 0;
  message = '';
  isLoggedIn = false;
  isLoggedIn1=false;
  test: any;
  recrutment!: Recrutment[];
  employe!:Employe;
  isLoadingOne = false;

 

  constructor(private getAlloff:OffreService,private fb: FormBuilder,private candidatServ:CandidatService) { 
    this.validateForm = this.fb.group({
      nom: ['', [Validators.required]],
      mail: ['', [Validators.email, Validators.required]],
      prenom: ['', [Validators.required]],
      phoneNumberPrefix: ['+216'],
      tel: ['', [Validators.required]],
      adresse: ['', [Validators.required]],
      // diplomes: this.fb.array([this.fb.control('')]),
      // diplomes:['', [Validators.required]],
      // experience: ['', [Validators.required]],
      skills: ['', [Validators.required]],
      picture: [''],
      cv: [''],
      
    });
  }

  getAlloffre():void{
    this.getAlloff.getAll()
    .subscribe(
      data => {
        this.offre=data;

        console.log(data);
      },
      error => {
        console.log(error);
      });
  
  }

  getId(id:any,titre:any):void{
    this.result2= titre
    this.result = id
    console.log(this.result);
  }

  creatCandidat() {
    
    this.candidatServ.upload( this.validateForm.value)
      .subscribe(data => {
        console.log(data);
      this.candidatId=(data.id);
        console.log(this.candidatId);

       
      }, error => console.log(error));

      console.log(this.listOfControl)

  }
  creatJointure() {setTimeout(() =>{
    this.candidatServ.attacheoOffrCandi( this.candidatId,this.result)
      .subscribe(data => {
        console.log(data);
        this.isLoggedIn = true;
      }, error => console.log(error));

      console.log(this.listOfControl)

    },5000)}
  selectFile(event:any) {
    this.selectedFiles = event.target.files;
    console.log(this.selectedFiles)
  }

uploadfile(event:any){

  if (event.target.files.length > 0) {
    const file = event.target.files[0];
    this.validateForm.get('picture')?.setValue(file);
    console.log(file)
  
  }

}
uploadfile2(event:any){

  if (event.target.files.length > 0) {
    const file = event.target.files[0];
    this.validateForm.get('cv')?.setValue(file);
    console.log(file)
  }

}

createNewcandidat(){
  const combined = `${this.validateForm.get('experience')?.value.map((value:any)=>value.annee)} `;
  const combinin = `${this.validateForm.get('experience')?.value.map((value:any)=>value.poste)}`  ;
  const formData :any = new FormData();
  formData.append('picture',this.validateForm.get('picture')?.value);
  formData.append('cv',this.validateForm.get('cv')?.value);
  formData.append('nom',this.validateForm.get('nom')?.value);
  formData.append('mail',this.validateForm.get('mail')?.value);
  formData.append('prenom',this.validateForm.get('prenom')?.value);
  formData.append('tel',this.validateForm.get('tel')?.value);
  formData.append('adresse',this.validateForm.get('adresse')?.value);
  formData.append('diplomes',this.validateForm.get('diplomes')?.value);
  formData.append('experience',combinin);
  formData.append('annee',combined);
  formData.append('skills',this.validateForm.get('skills')?.value);

  this.candidatServ.postCandidat( formData)
      .subscribe(data => {
        console.log(data);
      this.candidatId=(data.id);
     
        console.log(this.candidatId);
        this.creatJointure();
       
      }, error => { 
        console.log(error) ;
        this.isLoggedIn1 = true;
      }


  
);}

getJuction():void{
  this.getAlloff.getjuction()
  .subscribe(data => {

    
    // this.offre = data.filter(function(element:any){
   
    //   return element.employes.map((employe:any)=>employe.recrutements.avis === 'accepter')
    //   .every((emel:any) => emel === true ) ;
     
      
    //   });

    this.offre = data.filter((value:any) =>value.etat === 'accepter')
     console.log(this.offre)

    
    

  }, error => console.log(error));

}



  ngOnInit(): void {
 
    this.getJuction();
    this.addField();
    this.addField2();

  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
    this.validateForm;
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
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
  userNameAsyncValidator = (control: FormControl) =>
    new Observable((observer: Observer<ValidationErrors | null>) => {
      setTimeout(() => {
        if (control.value === 'JasonWood') {
          // you have to return `{error: true}` to mark it as an error event
          observer.next({ error: true, duplicated: true });
        } else {
          observer.next(null);
        }
        observer.complete();
      }, 1000);
    });

  confirmValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { error: true, required: true };
    }
    return {};
  };


  addField(): void {
    this.validateForm.addControl(
      'diplomes',
      this.fb.array([new FormControl('', [Validators.required])]));

  }

  adddplomes():void{
    this.getdiplomes.push( new FormControl('', [Validators.required]))
  }
 
  get getdiplomes() {
    return this.validateForm.get('diplomes') as FormArray;
  }
  
  deletdiplomes(i:number){
    this.getdiplomes.removeAt(i);
  }

  addField2(): void {
    
    this.validateForm.addControl(
      'experience',
      this.fb.array([new FormGroup({
        annee: new FormControl('', [Validators.required]),
        poste: new FormControl('', [Validators.required])
      })]));
    
  }

  addexperience():void{
    this.getexperiences.push( new FormGroup({
      annee: new FormControl('', [Validators.required]),
      poste: new FormControl('', [Validators.required])
    }));
  }
 
  get getexperiences() {
    return this.validateForm.get('experience') as FormArray;
  }

  deletexpriences(i:number){
    this.getexperiences.removeAt(i);
  }

  removeField2(i: { id2: number; controlInstance2: string }, e: MouseEvent): void {
    e.preventDefault();
    if (this.listOfControl2.length > 1) {
      const index = this.listOfControl2.indexOf(i);
      this.listOfControl2.splice(index, 1);
      console.log(this.listOfControl2);
      this.validateForm.removeControl(i.controlInstance2);
    }
  }

  loadOne(): void {
    this.isLoadingOne = true;
    setTimeout(() => {
      this.isLoadingOne = false;
    }, 5020);
  }



  // uploadFile(): void {

  //   this.progress=0;

  //   if (this.selectedFiles) {
  //     const file: File | null = this.selectedFiles.item(0);

  //     if (file) {
        
  //       this.currentFile = file;

  //       this.candidatServ.upload(this.currentFile).subscribe(
  //         (event: any) => {
  //           if (event.type === HttpEventType.UploadProgress) {
  //             this.progress = Math.round(100 * event.loaded / event.total);
  //             console.log(this.currentFile);
  //           } else if (event instanceof HttpResponse) {
  //             this.message = event.body.message;
              
  //           }
  //         },
  //         (err: any) => {
  //           console.log(err);
  //           this.progress = 0;

  //           if (err.error && err.error.message) {
  //             this.message = err.error.message;
  //           } else {
  //             this.message = 'Could not upload the file!';
  //           }

  //           this.currentFile = undefined;
  //         });

  //     }

  //     this.selectedFiles = undefined;
  //     console.log(file);
  //   }
  
  // }
  


}
