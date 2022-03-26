import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { matchValidator } from 'src/app/helper/form-validators';
@Component({
  selector: 'app-view-contact-us',
  templateUrl: './view-contact-us.component.html',
  styleUrls: ['./view-contact-us.component.css']
})
export class ViewContactUsComponent implements OnInit {
  errorMessage="";
  isLogin: boolean = false;
  adminEmail:any;
  userInfo : any;
  constructor(
    private _api: ApiService, 
    private _auth: AuthService, 
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {

    this.isUserLogin(); 
    this.adminEmail = this._auth.getUserDetails();
     let info = this._api.getTypeRequest('admin/contactusView').subscribe((res: any) => {
       if (res.status) { 
         this.userInfo = res.data;
       }
     
     }, err => {
       this.errorMessage = err['error'].message;
     });

    //  console.log("info: "+info);
    //  console.log("userInfo: "+this.userInfo);

  }
  isUserLogin(){
    console.log(this._auth.getUserDetails())
    if(this._auth.getUserDetails() != null){
        this.isLogin = true;
    }
  }
}
