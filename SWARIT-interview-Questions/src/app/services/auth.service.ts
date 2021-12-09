import { Injectable } from '@angular/core';

import {  Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    private userLoggedIn = new Subject<boolean>();

    constructor() {
      console.log("userLoggedIn: con"+this.userLoggedIn)
      this.userLoggedIn.next(false);
    }

    setUserLoggedIn(userLoggedIn: boolean) {
      this.userLoggedIn.next(userLoggedIn);
    }

    getUserLoggedIn(): Observable<boolean> {
      return this.userLoggedIn.asObservable();
    }
  
}