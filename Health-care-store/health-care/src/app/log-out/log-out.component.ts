import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-log-out',
  templateUrl: './log-out.component.html',
  styleUrls: ['./log-out.component.css']
})
export class LogOutComponent implements OnInit {
  isLogin: boolean = false;
  constructor(private _auth: AuthService,private _router:Router,) { }

  ngOnInit(): void {
    this.isUserLogin(); 
  }
  isUserLogin(){
    console.log(this._auth.getUserDetails())
    if(this._auth.getUserDetails() != null){
        this.isLogin = true;
    }
  }
  logout(){
    if(this._auth.getUserDetails() != null){
      this.isLogin = false;
    }
    this._auth.clearStorage()
    this._router.navigate(['home'])
  }

}
