import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }
  getCartUserDetails(variableName:string):String {
    return localStorage.getItem(variableName) ? JSON.parse(localStorage.getItem(variableName) || '{}') : null;
  }
  setCartInLocalStorage(variableName:string, data:string) {
      localStorage.setItem(variableName, data);
  }
  clearCart(variableName:string){
    localStorage.removeItem(variableName);

  }
}
