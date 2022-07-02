import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators  } from '@angular/forms';
import { Observable, Observer } from 'rxjs';
import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';
import { NzMessageService } from 'ng-zorro-antd/message';
import { TokenStorageService } from '../services/token-storage.service';
import { UsersService } from '../services/users.service';
import { Employe } from '../models/employe.model';
import { Roleem } from '../models/roleem.model';
import { HttpEventType,HttpResponse } from '@angular/common/http';
import { Inject } from '@angular/core';
import { WINDOW } from 'ngx-window-token';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  


  validateForm!: FormGroup;
  currentUser: any;
  editForm!: FormGroup;
  employe: Employe[] = [];
  employee!:Roleem;
  isSuccessful = false;

  
  selectedFiles?: FileList;
  currentFile?: File ;
  progress = 0;
  message = '';

  uploading = false;
  

  //file!: File;
  shortLink: string = "";

  fileInfos?: Observable<any>;
  
 
  origin = this.window.location.origin;
 

  constructor(private msg: NzMessageService,private token:TokenStorageService,private getUser:UsersService,private fb:FormBuilder, @Inject(WINDOW) private window: Window) {
    this.editForm = this.fb.group({
      id:['',[Validators.required]],
      utilisateur: ['',[Validators.required]],
      login: ['',[Validators.required]],
      post: ['',[Validators.required]],
      action: ['',[Validators.required]],
      mail: ['',[Validators.required]],
      picture:[null],
    
     
    } ); 
   }



 
  getEmploye(id: string): void {
  this.getUser.get(id)
  .subscribe(
    (employe: Roleem) => {
      this.editForm.patchValue({
        id:employe.id,
        mail: employe.mail, 
        utilisateur: employe.utilisateur,
        login: employe.login,
        post: employe.post,
        action: employe.action,
        picture:employe.picture,
      
      });
      
    
    },
    error => {
      console.log(error);
    });
  }


 

  updateEmployee(id:any) {
    this.getUser.update(id, this.editForm.value)
      .subscribe(data => {
        console.log(data);
        this.isSuccessful = true;
       
      }, error => console.log(error));
  }

 
selectFile(event:any) {
  this.selectedFiles = event.target.files;
}



  uploadFile(id:any): void {

    this.progress=0;

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        
        this.currentFile = file;

        this.getUser.uploadProfileImage(id,this.currentFile).subscribe(
          (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round(100 * event.loaded / event.total);
              console.log(this.currentFile);
            } else if (event instanceof HttpResponse) {
              this.message = event.body.message;
              this.fileInfos = this.getUser.get(this.currentUser.id);
            }
          },
          (err: any) => {
            console.log(err);
            this.progress = 0;

            if (err.error && err.error.message) {
              this.message = err.error.message;
            } else {
              this.message = 'Could not upload the file!';
            }

            this.currentFile = undefined;
          });

      }

      this.selectedFiles = undefined;
      console.log(file);
    }
  
  }
  
 
  reloadCurrentPage() {
    window.location.reload();
   } 


  ngOnInit(): void {
    
    this.currentUser = this.token.getUser();
    this.getEmploye(this.currentUser.id)
    this.fileInfos = this.getUser.getFiles(this.currentUser.id);
    console.log(this.editForm.value)
    this.fileInfos =this.getUser.get(this.currentUser.id);
    console.log(this.currentUser);
    console.log(this.currentUser.id)
    
    
  }

  handleChange(info: NzUploadChangeParam): void {
    if (info.file.status !== 'uploading') {
    this.currentFile = info.file!.originFileObj!;

    this.getUser.uploadProfileImage(this.currentUser.id,this.currentFile).subscribe(
      (event: any) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
          console.log(this.currentFile);
          this.reloadCurrentPage()
        } else if (event instanceof HttpResponse) {
          this.message = event.body.message;
          this.fileInfos = this.getUser.get(this.currentUser.id);
        }
      },
      (err: any) => {
        console.log(err);
        this.progress = 0;

        if (err.error && err.error.message) {
          this.message = err.error.message;
        } else {
          this.message = 'Could not upload the file!';
        }

        this.currentFile = undefined;
      });
      this.selectedFiles = undefined;

    
      console.log(info.file, info.fileList);
      console.log(info.file.originFileObj);
      
      }
    if (info.file.status === 'done') {
      this.msg.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      this.msg.success(`${info.file.name} file uploaded successfully`);
      // this.msg.error(`${info.file.name} file upload failed.`);
    }
  }


}



