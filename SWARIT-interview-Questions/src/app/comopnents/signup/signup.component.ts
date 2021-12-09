import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { matchValidator } from 'src/app/helper/form-validators';
import { HttpClient } from '@angular/common/http';
import { AuthResponse } from 'src/app/interface/appInterface';
import {config} from '../../../config'




@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm:FormGroup | any;

  userNotSigned:boolean;

  constructor(private formBuilder: FormBuilder,
              private router : Router, private http:HttpClient ) { 
          
                this.userNotSigned=true;
                

  }


  
  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      email: new FormControl('',
      [Validators.required,
        Validators.maxLength(255),
        Validators.email,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')
      ]),
        
      password: new FormControl('',
       [Validators.required,
        Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
        Validators.minLength(6),
        Validators.maxLength(25),
        matchValidator('confirmPassword', true)]),
      confirmPassword: new FormControl('', 
       [Validators.required,
        matchValidator('password')]),
      accepted_tearms: new FormControl(false,Validators.requiredTrue),
    });

  }

  checked(){
    this.signupForm()
  }



   signupUser(){
    console.log("insid signup method")

      if(this.signupForm.valid){
        console.log("form valid")
        this.userNotSigned=true
        const email = this.signupForm.value.email;
        const password = this.signupForm.value.password;     
        this.http.post<AuthResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${config.API_KEY}`,{
          email: email,
          password:password,
          returnSecureToken: true
        }).subscribe(res=>{
          this.router.navigate(["home"]);
        },
        err=>{
          console.log(err)
          this.userNotSigned = false;
        }); 
      
      }
    }
  

}
