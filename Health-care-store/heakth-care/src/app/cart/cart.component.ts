import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CartService } from '../services/cart.service';
import { ApiService } from '../services/api.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  errorMessage="";
  isLogin: boolean = false;
  adminEmail:any;
  productsInfo : any;
  submmited = false;
  changeSucess = false;
  userEmail:any;
  userCart: Array<Object> |any;
  cartProducts:Array <Object>|any = [];
  cartTotal:number = 0;
  shoppingPrice: number =15;
  deleteSuccessM:String=""
  constructor(
    private _auth : AuthService,
    private _cart : CartService,
    private _api: ApiService, 
    private _router:Router,
    private fb : FormBuilder
  
  ) { }

 
  ngOnInit(): void {
 
    this.isUserLogin(); 
    this.userEmail = this._auth.getUserDetails()[0];
    this.userCart=this._cart.getCartUserDetails(this.userEmail['email']+'cart');
    for (let i = 0; i < this.userCart.length; i++) {
      this.cartProducts.push(this.userCart[i]['name']);
      this.cartTotal = this.cartTotal + Number(this.userCart[i]['price']);
    }


    
  }
  onSubmit(){
    let data = [
      this.userEmail,
      this.cartProducts,
      this.cartTotal+this.shoppingPrice] ;
      this.submmited = true;

      this._api.createUser(data,'user/order').subscribe((res:any)=>{
        if (res.status) {  
          this._router.navigate(['home']);
          this._cart.clearCart(this.userEmail['email']+'cart')
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
