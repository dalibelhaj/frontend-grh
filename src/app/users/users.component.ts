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
import { NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';



//type EmployeRole = Employe <Role []> ;

interface ColumnItem {
  name: string;
  sortOrder: NzTableSortOrder | null;
  sortFn: NzTableSortFn<Employe> | null;
  listOfFilter: NzTableFilterList;
  filterFn: NzTableFilterFn<Employe> | null;
  filterMultiple: boolean;
  sortDirections: NzTableSortOrder[];
}



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

 
  editForm!: FormGroup;
  listOfDisplayData :any;
  visible = false;
  searchValue = '';
  
  customerObj: any = {};
  customerObj2: any = {};
  ppost = [{ label: 'Agent RH', value: 'Agent RH'} ,
   { label: 'Directeur RH', value: 'Directeur RH'} ,
   { label: 'Directeur financier', value: 'Directeur financier'} , 
   { label: 'Directeur general', value: 'Directeur general'} ];

   roleee = [{ label: 'Utilisateur', value: 'user'} ,
   { label: 'Admine', value: 'admin'} , 
  ];
  deletem!: Employe[];

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



  listOfColumns: ColumnItem[] = [
    {
      name: 'Post',
      sortOrder: null,
      sortFn: (a: Employe, b: Employe) => a.post.localeCompare(b.post),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      listOfFilter: [
        { text: 'Agent RH', value: 'Agent RH' },
        { text: 'Directeur RH', value: 'Directeur RH' },
        { text: 'Directeur financier ', value: 'Directeur financier' }, 
        { text: 'Directeur general ', value: 'Directeur general' },  
      ],
      filterFn: (list: string[], item: Employe) => list.some(etat => item.post.indexOf(etat) !== -1)
    },
    {
      name: 'Role',
      sortOrder: null,
      sortFn: null,
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      listOfFilter: [
        { text: 'Utilisateur', value: 'user' },
        { text: 'Admine', value: 'admin' },
       
      ],
      filterFn: (list: string[], item: Employe) => list.some(etat => this.formatRoles(item.roles).indexOf(etat) !== -1)
    },

  ];

  constructor(private usersService: UsersService,private authService:AuthService,private fb:FormBuilder,private modal: NzModalService) { 

   const {required, maxLength, minLength, email} = MyValidators ;
  this.validateForm = this.fb.group({
    utilisateur: ['', [required, maxLength(20), minLength(6)], [this.userNameAsyncValidator]],
    login: ['', [required]],
    mail: ['', [required, email]],
    post: ['', [required]],
    action: ['', [required]],
    roles:['',[required]],
    password: ['', [required,maxLength(20), minLength(8)]],
    confirm: ['', [this.confirmValidator]]
  }); }


  validateForm!: FormGroup ;
  autoTips: Record<string, Record<string, string>> = {
    'zh-cn': {
      required: 'Champs obligatoires'
    },
    en: {
      required: 'Champs obligatoires'
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
   showDeleteConfirm(row:any): void {

      this.isVisible2 = true;
    this.deletem=[row]
    console.log(this.deletem)
     
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

          this.employe = data.reverse();
          this.listOfDisplayData = [...this.employe];


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
  
    this.authService.register(this.validateForm.value).subscribe(
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

  trackByName(_: number, item: ColumnItem): string {
    return item.name;
  }

  search(): void {
    this.visible = false;
    this.listOfDisplayData = this.employe.filter((item: Employe) => item.utilisateur.indexOf(this.searchValue) !== -1);
  }
  reset(): void {
    this.searchValue = '';
    this.search();
  }
  changeCustomer(nembreppost: any) {
    this.customerObj = nembreppost;
   
  }
  changeCustomer2(nembreppost: any) {
    this.customerObj2 = nembreppost;
    
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


