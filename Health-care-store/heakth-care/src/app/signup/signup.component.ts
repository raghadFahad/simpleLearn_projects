import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { matchValidator } from 'src/app/helper/form-validators';
import { CustomvalidationService } from '../services/customvalidation.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup | any;
  usedEmail: boolean = false;
  isLogin: boolean = false
  submitted = false;
  errorMessage =""

  constructor(
    private _api: ApiService, 
    private _auth: AuthService, 
    private _router:Router,
    private fb: FormBuilder,
    private customValidator: CustomvalidationService

  ) { }



  ngOnInit(): void {
   this.isUserLogin(); 
   this.signupForm = this.fb.group({
    email: ['',[Validators.required,
    Validators.maxLength(255),
    Validators.email,
    Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$') ]
    ],

    
    password: ['', 
      [Validators.required, 
      this.customValidator.patternValidator(),
      matchValidator('conPassword', true)]],

    name:['',Validators.required],
    phone: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
    conPassword:['', 
    [Validators.required,
     matchValidator('password')]],

  });

    
  }

  onSubmit(){
     let data = [
       this.signupForm.controls['email'].value,
       this.signupForm.controls['password'].value,
       this.signupForm.controls['name'].value,
       this.signupForm.controls['phone'].value] ;
       this.submitted = true;

      //  if (this.signupForm.valid) {

          this._api.createUser(data,'user/register').subscribe((res:any)=>{
            if (res.status) { 
              console.log(res.status)
              this._auth.setDataInLocalStorage('userData', JSON.stringify(res.data));  
              this._auth.setDataInLocalStorage('token', res.token);  
              this._router.navigate(['home']);
            } else { 
              this.usedEmail == true;
              // alert(res.msg)
            }

          }, err => {
            this.errorMessage = err['error'].message;
          });
          this._api.postTypeRequest('user/register',  this.signupForm.value).subscribe((res: any) => {
            if(res.status == 2){
              this.usedEmail = true;
              }else{
            if (res.status) { 
              
              console.log(res.status)
              this._auth.setDataInLocalStorage('userData', JSON.stringify(res.data));  
              this._auth.setDataInLocalStorage('token', res.token);  
              this._router.navigate(['home']);
            } else { 
                         }
          }
          }, err => {
            this.errorMessage = err['error'].message;
          });
    
  }
  isUserLogin(){
    
    // if(this._auth.getUserDetails() != null){
    //     this.isLogin = true;
    // }
  }
  

}
