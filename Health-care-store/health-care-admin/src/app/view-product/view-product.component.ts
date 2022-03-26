import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {
  errorMessage="";
  isLogin: boolean = false;
  adminEmail:any;
  productsInfo : any;
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
     let info = this._api.getTypeRequest('admin//productsView').subscribe((res: any) => {
       console.log(res.status)
       if (res.status) { 
         this.productsInfo = res.data;
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
