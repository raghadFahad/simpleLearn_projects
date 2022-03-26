import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private _auth: AuthService, ) { }
  isLogin: boolean = false

  ngOnInit(): void {
    this.isUserLogin(); 
  }

  isUserLogin(){
    console.log(this._auth.getUserDetails())
    if(this._auth.getUserDetails() != null){
        this.isLogin = true;
    }
  }

}
