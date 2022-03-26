import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  getUserDetails():String {
    return localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData') || '{}') : null;
  }
  setDataInLocalStorage(variableName:string, data:string) {
      localStorage.setItem(variableName, data);
  }
  getEmail() {
      return localStorage.getItem('email');
  }
  clearStorage() {
      localStorage.clear();
  }
}
