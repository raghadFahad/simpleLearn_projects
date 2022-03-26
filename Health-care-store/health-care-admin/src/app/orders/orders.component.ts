import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  errorMessage="";
  isLogin: boolean = false;
  adminEmail:any;
  ordersInfo : any;
  submmited = false;
  changeSucess = false;
  deleteSuccessM:String=""
  constructor(
    private _api: ApiService, 
    private _auth: AuthService, 
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {

    this.isUserLogin(); 
     let info = this._api.getTypeRequest('admin//orderView').subscribe((res: any) => {
       console.log(res.status)
       if (res.status) { 
         this.ordersInfo = res.data;
       }
     }, err => {
       this.errorMessage = err['error'].message;
     });
  }
  deletProduct(productN:String){
    this.submmited = true
    console.log(productN);
    this._api.postTypeRequest('admin/productsDelete',[productN]).subscribe((res: any) => {
      if (res.status) { 
        this.changeSucess = true;
      } else { 
        this.changeSucess = false;
      }
    
    }, err => {
      this.errorMessage = err['error'].message;
    }
  );

  }
  isUserLogin(){
    console.log(this._auth.getUserDetails())
    if(this._auth.getUserDetails() != null){
        this.isLogin = true;
    }
  }
}
