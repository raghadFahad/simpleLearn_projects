import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import { FormGroup } from '@angular/forms';


import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import {UserAccountManagementService} from '../services/user-account-management.service'

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
  providers: [UserAccountManagementService]
})
export class SigninComponent implements OnInit {
  loginForm :FormGroup | any;
  isLogin: boolean = false;
  submitted = false;
  nonUser = false
  errorMessage=""

  constructor( private _api: ApiService, 
    private _auth: AuthService, 
    private _router:Router,
    private fb: FormBuilder,
    ) {
   
   }
  

  ngOnInit(): void {
    this.nonUser = false

    // this.isUserLogin(); 
    this.loginForm =this.fb.group ({
      email:['',Validators.required],
      password: ['',Validators.required],
    });
  }
 
  onSubmit() {
    this.submitted = true;
    if(this.loginForm.valid){
    this._api.postTypeRequest('user/login', this.loginForm.value).subscribe((res: any) => {
      if (res.status) { 
        this._auth.setDataInLocalStorage('userData', JSON.stringify(res.data));  
        this._auth.setDataInLocalStorage('token', res.token);  
        this._router.navigate(['home']);
      } else { 
        this.nonUser = true;
      }
    
    }, err => {
      this.errorMessage = err['error'].message;
    }
  );
    }
  }
  isUserLogin(){
    console.log(this._auth.getUserDetails())
    if(this._auth.getUserDetails() != null){
        this.isLogin = true;
    }
  }

}
