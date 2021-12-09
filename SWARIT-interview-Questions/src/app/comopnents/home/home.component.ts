import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @Input() userSignedIn: boolean;
   user = localStorage.getItem('user');

  constructor(private router:Router) { 
    this.userSignedIn = false;

  }

  ngOnInit(): void {
  

  }
  onSubmit(questionTitle:String){
 
    if(this.user){
    localStorage.setItem('questionTitle',questionTitle.toString());
    this.router.navigate(["questions"]);
    }else{
      this.router.navigate(["signin"]);
    }

  }

}
