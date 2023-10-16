import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userInfo:any;

  constructor(private _Httpclient:HttpClient) { }
  baceUrl:string='https://ecommerce.routemisr.com/api/v1/auth/'
  register(userData:object):Observable<any>{
    return this._Httpclient.post(this.baceUrl+'signup',{userData})
  }
  login(userData:object):Observable<any>{
    return this._Httpclient.post(this.baceUrl+'signin',{userData})
  }
  decodeUser():void{
    const encode=localStorage.getItem('etoken')
    if(encode != null){
      const decode= jwtDecode(encode)
      this.userInfo=decode;
      console.log(this.userInfo)
    }
  }
}
