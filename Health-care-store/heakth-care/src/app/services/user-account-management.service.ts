import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModule } from '../models/user/user.module';



@Injectable({
  providedIn: 'root'
})
export class UserAccountManagementService {

  constructor(private http: HttpClient) { }

  validateLogin(user: UserModule){
    return this.http.post('/api/user/login',{
        username : user.username,
        password : user.password
    })
}
}

