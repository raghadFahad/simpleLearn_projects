import { Component} from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './services/auth.service';

import { BnNgIdleService } from 'bn-ng-idle';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = "Interview Questions"
  constructor(private router:Router, private bnIdle: BnNgIdleService, private authSer :AuthService) { // initiate it in your component constructor

          this.authSer.getUserLoggedIn().subscribe(userLoggedIn => {
          if (userLoggedIn) {
            this.bnIdle.startWatching(100).subscribe((res) => {
              if(res) {
                this.router.navigate(["signin"]);
              }
            })
          }
      })
  }
       
}
