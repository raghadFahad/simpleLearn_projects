import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { matchValidator } from '../helper/form-validators';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { FileUploadService } from '../services/file-upload.service';

import { CustomvalidationService } from '../services/customvalidation.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  

  errorMessage="";
  isLogin: boolean = false;
  adminEmail:any;
  userInfo : any;
  products :FormBuilder | any;
  changeUserInfo : FormBuilder | any;
  submitted = false;
  changeSucess= false;
  shortLink: string = "";
  loading: boolean = false; // Flag variable
  productData : any;
  file: File|any = null; // Variable to store file

  url: any;




  constructor(private _auth: AuthService,
    private _api: ApiService,
    private fb: FormBuilder,
    private customValidator: CustomvalidationService,
    private fileUploadService: FileUploadService) { }

  ngOnInit(): void {
    this.isUserLogin(); 
  //  this.adminEmail = this._auth.getUserDetails();
  //   this._api.postTypeRequest('admin/profile',this.adminEmail).subscribe((res: any) => {
  //     if (res.status) { 
  //       this.userInfo = res.data;
  //     }
    
  //   }, err => {
  //     this.errorMessage = err['error'].message;
  //   });
   
    this.products = this.fb.group({
      Pname :['',Validators.required],     
      Pquantity: ['', Validators.required],
       Ptype: ['', Validators.required],
      Pprice:['', 
      [Validators.required,Validators.min(1),Validators.maxLength(3)]],
      Pimage: ['', Validators.required],

    });
   
}
changeType(e: any) {
  this.typeName?.setValue(e.target.value, {
    onlySelf: true,
  });
}
// Access formcontrols getter
get typeName() {
  return this.products.get('Ptype');
}
 selectedImag : File |any ; 
selecteImage(event:any){
  this.selectedImag = <File> event.target.files[0];
}

//function for changing password 
addProducts(){
  this.submitted = true;
   const productImage = "../../assets/images/"+this.selectedImag.name;

  this.productData = [this.products.controls['Pname'].value,
              this.products.controls['Pquantity'].value,
              this.products.controls['Ptype'].value,
              this.products.controls['Pprice'].value,
              productImage];
      

  this._api.createUser(this.productData,'admin/addProduct').subscribe((res:any)=>{
    if (res.status) { 
      this.changeSucess = true;
      
    } else{
      this.changeSucess = false;
    }
  }, err => {
    this.errorMessage = err['error'].message;
  });
  
}
isUserLogin(){
  console.log(this._auth.getUserDetails())
  if(this._auth.getUserDetails() != null){
      this.isLogin = true;
  }
}

}
