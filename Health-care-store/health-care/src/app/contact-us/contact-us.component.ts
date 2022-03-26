import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';


@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  contactUsForm:FormGroup|any;
  submitted = false;
  successedSend =false
  errorMessage =""


  constructor(  private _api: ApiService, 
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.contactUsForm = this.fb.group({
      name:['',Validators.required],
      email: ['',[Validators.required,
      Validators.maxLength(255),
      Validators.email,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$') ]
      ],
      text:['',Validators.required]
    });
  }
  onSubmit(){
         this._api.postTypeRequest('user/contactus',  this.contactUsForm.value).subscribe((res: any) => {
           if (res.status) { 

            if(res.status == 1){
             this.successedSend = true;
           } 
         }
         }, err => {
           this.errorMessage = err['error'].message;
         });
  }

}
