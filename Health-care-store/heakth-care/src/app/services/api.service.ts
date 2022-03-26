import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = 'http://localhost:3000/';

  constructor(private _http: HttpClient) { }
  getAllData(url:String): Observable<any>{
    return this._http.get(`${this.baseUrl}${url}`)
  }
  createUser(data:any,url:string): Observable<any>{
    return this._http.post(`${this.baseUrl}${url}`,data)
    .pipe(map(res => {
      return res;
    }));
  }
  getsingleUser(url:String,data:any): Observable<any>{
    return this._http.get(`${this.baseUrl}${url}`,data);
  }

  getTypeRequest(url:string) {
    return this._http.get(`${this.baseUrl}${url}`).pipe(map(res => {
      return res;
    }));
  }
  postTypeRequest(url:string, payload:any) {
    return this._http.post(`${this.baseUrl}${url}`, payload).pipe(map(res => {
      return res;
    }));
  }
  getTypeRequestL(url:string, data:any) {
    return this._http.post(`${this.baseUrl}${url}`, data).pipe(map(res => {
      return res;
    }));
  }
  putTypeRequest(url:string, payload:string) {
    return this._http.put(`${this.baseUrl}${url}`, payload).pipe(map(res => {
      return res;
    }));
  }
}
