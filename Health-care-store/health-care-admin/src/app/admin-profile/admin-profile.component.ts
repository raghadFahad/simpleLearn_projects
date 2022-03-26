import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { matchValidator } from '../helper/form-validators';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { CustomvalidationService } from '../services/customvalidation.service';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css']
})
export class AdminProfileComponent implements OnInit {

  

  errorMessage="";
  isLogin: boolean = false;
  adminEmail:any;
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

  ngOnInit(): void {
    this.isUserLogin(); 
   this.adminEmail = this._auth.getUserDetails();
    this._api.postTypeRequest('admin/profile',this.adminEmail).subscribe((res: any) => {
      if (res.status) { 
        this.userInfo = res.data;
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

  this._api.postTypeRequest('admin/changePassword',userNewInfo).subscribe((res: any) => {
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
