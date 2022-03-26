import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() { }
  getUserDetails():String {
    return localStorage.getItem('adminData') ? JSON.parse(localStorage.getItem('adminData') || '{}') : null;
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
