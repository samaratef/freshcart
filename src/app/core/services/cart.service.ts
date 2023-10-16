import { HttpClient } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  baseUrl:string='https://ecommerce.routemisr.com/api/v1/'
  myToken:any={token:localStorage.getItem('etoken')}
  cartNumber:BehaviorSubject<number>=new BehaviorSubject(0)

  constructor(private _HttpClient:HttpClient) { }

  addToCart(prodId:string):Observable<any>{
    return this._HttpClient.post(this.baseUrl+'cart',
    {productId:prodId},
    {headers:this.myToken})
    
  }

  getCartUser():Observable<any>{
    return this._HttpClient.get(this.baseUrl+'cart',
    {headers: this.myToken})
  }

  removeCartItem(prodId:string):Observable<any>{
    return this._HttpClient.delete(this.baseUrl+`cart/${prodId}`,
    {headers: this.myToken})
  }
  updateChangeCount(prodId:string,count:number):Observable<any>{
    return this._HttpClient.put(this.baseUrl+`cart/${prodId}`,
    {
      count:count
    },
    {
      headers:this.myToken
    })
  }

  clearCart():Observable<any>{
    return this._HttpClient.delete(this.baseUrl+`cart`,
    {headers: this.myToken})
  }
  checkOut(cartId:string|null, orderInfo:object):Observable<any>{
    return this._HttpClient.post(this.baseUrl+
      `orders/checkout-session/${cartId}?url=http://localhost:4200`,
      {
        shippingAddress:orderInfo
      },
      {
        headers:this.myToken
      })
  }

}
