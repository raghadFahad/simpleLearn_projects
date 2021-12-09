import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Auth, User, user} from '@angular/fire/auth';
import {  Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { AuthResponse } from 'src/app/interface/appInterface';
import { HttpClient } from '@angular/common/http';
import {config} from '../../../config'
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  user$: Observable<User | null>;
  userNotSigned:boolean=true;

  private userLoggedIn = new Subject<boolean>();


  signinForm:FormGroup|any;



  constructor(private formBuilder: FormBuilder, private auth: Auth,
     private router:Router,private http:HttpClient, private authSer : AuthService) { 
    this.user$ = user(auth);
    this.userLoggedIn.next(false);


  }

  ngOnInit(): void {

  

    this.signinForm = this.formBuilder.group({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      rememberMe: new FormControl(false)

    });
    if(localStorage.getItem('rememberMe') !== null)
    {
      console.log("Not null")
      this.signinForm.email.value = localStorage.getItem('email');
      this.signinForm.password.value = localStorage.getItem('password');
    }
  }

  setUserLoggedIn(userLoggedIn: boolean) {
    this.userLoggedIn.next(userLoggedIn);
  }

  getUserLoggedIn(): Observable<boolean> {
    return this.userLoggedIn.asObservable();
  }

  rememberMe(){
    this.signinForm.rememberMe = true;
  }

  signinUser(){
    if(this.signinForm.valid){
      this.userNotSigned=true
      const email = this.signinForm.value.email;
      const password = this.signinForm.value.password;     
      this.http.post<AuthResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${config.API_KEY}`,{
        email: email,
        password:password,
        returnSecureToken: true
      }).subscribe(user=>{
        if(user){
          localStorage.setItem('user', JSON.stringify(user));   
          this.authSer.setUserLoggedIn(true);
          this.router.navigate(["home"]);
         
        }
      },
      err=>{
        console.log(err)
        this.userNotSigned = false;
      }); 
    
    }
}
  

}
