import { Component, OnInit } from '@angular/core';
import { Employe } from '../models/employe.model';
import { Role } from '../models/role.model';
import { RolesService } from '../services/roles.service';
import { UsersService } from '../services/users.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators  } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Observable, Observer } from 'rxjs';
import { NzSafeAny } from 'ng-zorro-antd/core/types';

//type EmployeRole = Employe <Role []> ;





@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})

export class UsersComponent implements OnInit {
  
  form: any = {
    utilisateur: null,
    login: null,
    mail: null,
    post: null,
    action: null,
    password:null,
    roles:null
  };
  validater:any;
  
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  role!: Role[];
  isVisible = false;
  isVisible1 = false;
  isVisible2 = false;
  isOkLoading = false;
  employe: Employe[] = [];

  currentEmploye: Employe = {
    roles: [],
  };
  editForm!: FormGroup;
 

  




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

  confirmValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { error: true, required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  constructor(private usersService: UsersService, private roleService: RolesService,private authService:AuthService,private fb:FormBuilder,private modal: NzModalService) { 

   const {required, maxLength, minLength, email} = MyValidators ;
  this.validateForm = this.fb.group({
    utilisateur: ['', [required, maxLength(12), minLength(6)], [this.userNameAsyncValidator]],
    login: ['', [required]],
    mail: ['', [required, email]],
    post: ['', [required]],
    action: ['', [required]],
    roles:['',[required]],
    password: ['', [required]],
    confirm: ['', [this.confirmValidator]]
  }); }


  validateForm!: FormGroup ;
  autoTips: Record<string, Record<string, string>> = {
    'zh-cn': {
      required: '必填项'
    },
    en: {
      required: 'Input is required'
    },
    default: {
      email: 'Le format de e-mail est incorrect/The input is not valid email'
    }
  };
  userNameAsyncValidator = (control: FormControl) =>
    new Observable((observer: Observer<MyValidationErrors | null>) => {
      setTimeout(() => {
        if (control.value === 'JasonWood') {
          observer.next({
            duplicated: { 'zh-cn': `Ce nom d'utilisateur existe déjà`, en: `The username is redundant!` }
          });
        } else {
          observer.next(null);
        }
        observer.complete();
      }, 1000);
    });

  
  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isOkLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isOkLoading = false;
    }, 3000);
  }

  handleCancel1(): void {
    console.log('Button cancel clicked!');
    this.isVisible1 = false;
  }

  showModal1(employe:Employe): void {
    this.isVisible1 = true;
    this.editForm.patchValue( {
      id:employe.id,
      mail: employe.mail, 
      utilisateur: employe.utilisateur,
      login: employe.login,
      post: employe.post,
      action: employe.action,
      password:employe.password,
      roles: employe.roles
    });
  }

  handleOk1(): void {
    console.log('Button ok clicked!');
    this.isVisible1 = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }
  handleOk2(): void {
    console.log('Button ok clicked!');
    this.isVisible2 = false;
  }

  handleCancel2(): void {
    console.log('Button cancel clicked!');
    this.isVisible2 = false;
  }



  reloadCurrentPage() {
    window.location.reload();
   }
   showDeleteConfirm(employe:Employe): void {

      this.isVisible2 = true;

     
  }

  updateEmployee(id:any) {
    this.usersService.update(id, this.editForm.value)
      .subscribe(data => {
        console.log(data);
        
       
      }, error => console.log(error));
  }

  deleteEmploye(ofId : any): void {
    this.usersService.delete(ofId)
      .subscribe(
        response  => {
          this.employe= this.employe.filter(employee=> employee.id !== ofId);
          console.log(response);
          
        },
        error => {
          console.log(error);
        });
  }

  getEmploye(id: string): void {
    this.usersService.get(id)
      .subscribe(
        data => {
          this.employe= this.employe.filter(employee=> employee.id !== id);
          this.isVisible1 = true;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }



  retrieveEmploye(): void {
    this.usersService.getAll()
      .subscribe(
        data => {

          this.employe = data;


          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  ngOnInit(): void {
    this.retrieveEmploye();
    this.submitForm();

    this.editForm = this.fb.group({
      id:[''],
      utilisateur: [''],
      login: [''],
      post: [''],
      action: [''],
      mail: [''],
      password:[''],
      roles: ['']
    } );
  }
  
  onSubmit(): void {
    const { utilisateur, login, mail, post, action, password, roles} = this.form;
  
    this.authService.register(utilisateur, login, mail, post, action, password, roles).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }

  formatRoles(roles: Role[]) {
    return roles.map(role =>role.name).join(", ")
  }



  validateConfirmPassword(): void {
    setTimeout(() => this.validateForm.controls.confirm.updateValueAndValidity());
  }

  



}
export type MyErrorsOptions = { 'zh-cn': string; en: string } & Record<string, NzSafeAny>;
export type MyValidationErrors = Record<string, MyErrorsOptions>;
export class MyValidators extends Validators {
  static override minLength(minLength: number): ValidatorFn {
    return (control: AbstractControl): MyValidationErrors | null => {
      if (Validators.minLength(minLength)(control) === null) {
        return null;
      }
      return { minlength: { 'zh-cn': `最小长度为 ${minLength}`, en: `MinLength is ${minLength}` } };
    };
  }

  static override maxLength(maxLength: number): ValidatorFn {
    return (control: AbstractControl): MyValidationErrors | null => {
      if (Validators.maxLength(maxLength)(control) === null) {
        return null;
      }
      return { maxlength: { 'zh-cn': `La longueur maximale est ${maxLength}`, en: `MaxLength is ${maxLength}` } };
    };
  }

  static mobile(control: AbstractControl): MyValidationErrors | null {
    const value = control.value;

    if (isEmptyInputValue(value)) {
      return null;
    }

    return isMobile(value)
      ? null
      : { mobile: { 'zh-cn': `Le format du numéro de portable est incorrects`, en: `Mobile phone number is not valid` } };
  }
}

function isEmptyInputValue(value: NzSafeAny): boolean {
  return value == null || value.length === 0;
}

function isMobile(value: string): boolean {
  return typeof value === 'string' && /(^1\d{10}$)/.test(value);
}


