import { ArrayType } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { CartService } from '../services/cart.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

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
    private _cart:CartService
  ) { }

  ngOnInit(): void {
    let info = this._api.getTypeRequest('user//productsView').subscribe((res: any) => {
      console.log(res.status)
      if (res.status) { 
        this.productsInfo = res.data;
      }
    }, err => {
      this.errorMessage = err['error'].message;
    });
    console.log( this.productsInfo)
  }
  
  oldCart : Array<Object> |any;
  newCart : Array<Object> = [];
  
  userEmail :any
  addtoCart(productsN:string, productsP:string){
    this.userEmail = this._auth.getUserDetails()[0];
    
    this.oldCart=this._cart.getCartUserDetails(this.userEmail['email']+'cart');
  
    this.newCart.push({"name":productsN, "price":productsP});
    
    this._cart.setCartInLocalStorage(this.userEmail['email']+'cart', JSON.stringify(this.newCart)); 
   
  }
  getUrl(){
    return "url('assets/images/home_back.jpeg')";

  }
  isUserLogin(){
    console.log(this._auth.getUserDetails())
    if(this._auth.getUserDetails() != null){
        this.isLogin = true;
    }
  }

}
