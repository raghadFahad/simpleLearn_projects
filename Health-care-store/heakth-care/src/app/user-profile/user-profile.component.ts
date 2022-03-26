import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { matchValidator } from '../helper/form-validators';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { CustomvalidationService } from '../services/customvalidation.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {


  errorMessage="";
  isLogin: boolean = false;
  userInfo : any;
  changPasswordForm :FormBuilder | any;
  changeUserInfo : FormBuilder | any;
  submitted = false;
  changeSucess= false;



  constructor(private _auth: AuthService,
    private _api: ApiService,
    private fb1: FormBuilder,
    private fb2: FormBuilder,
    private customValidator: CustomvalidationService) { }
    userEmail:any;
  ngOnInit(): void {
    this.isUserLogin(); 
    this.userEmail = this._auth.getUserDetails();
    console.log(this.userEmail);
    this._api.postTypeRequest('user/profile',this.userEmail).subscribe((res: any) => {
      if (res.status) { 
        this.userInfo = res.data;
        console.log("data:"+this.userInfo.value);

      }
    
    }, err => {
      this.errorMessage = err['error'].message;
    });
    this.changPasswordForm = this.fb2.group({
      oldPassword :['',Validators.required],     
      newPassword: ['', 
        [Validators.required, 
        this.customValidator.patternValidator(),
        matchValidator('conNewPassword', true)]],
      conNewPassword:['', 
      [Validators.required,
       matchValidator('newPassword')]],
    });
   
}
//function for changing password 
changePassword(){
  this.submitted = true;
  const userNewInfo = [this.userInfo[0]['email'],this.changPasswordForm.value];

  this._api.postTypeRequest('user/changePassword',userNewInfo).subscribe((res: any) => {
    if (res.status) { 
      if(res.status == 1){
        this.changeSucess =true;
        }
    }
  
  }, err => {
    this.errorMessage = err['error'].message;
  });

}
isUserLogin(){
  console.log(this._auth.getUserDetails())
  if(this._auth.getUserDetails() != null){
      this.isLogin = true;
  }
}

}
