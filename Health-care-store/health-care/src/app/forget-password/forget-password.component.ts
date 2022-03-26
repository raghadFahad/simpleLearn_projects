import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { matchValidator } from '../helper/form-validators';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { CustomvalidationService } from '../services/customvalidation.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  errorMessage="";
  userInfo : any;
  changPasswordForm :FormBuilder | any;
  submitted = false;
  changeSucess= false;

  constructor(private _auth: AuthService,
    private _api: ApiService,
    private fb1: FormBuilder,
    private customValidator: CustomvalidationService) { }

  ngOnInit(): void {
    this.changPasswordForm = this.fb1.group({
      email :['',Validators.required],     
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

  this._api.postTypeRequest('user/passwordRecovery',this.changPasswordForm.value).subscribe((res: any) => {
    if (res.status) { 
      if(res.status == 1){
        this.changeSucess =true;
      }
    }
  
  }, err => {
    this.errorMessage = err['error'].message;
  });

}

}
