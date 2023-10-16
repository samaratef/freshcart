import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WishlistService } from 'src/app/core/services/wishlist.service';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/core/services/cart.service';
import { product } from 'src/app/core/interfaces/product';
import { RouterLink } from '@angular/router';
import { CuttextPipe } from 'src/app/core/pipe/cuttext.pipe';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule,RouterLink,CuttextPipe],
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {
  products: product[]=[];
  wishListData:string[]=[];
  constructor(private _WishlistService:WishlistService,
    private Renderer2:Renderer2,
    private _ToastrService:ToastrService,
    private _CartService:CartService){}
  ngOnInit(): void {
    this._WishlistService.getWishList().subscribe({
      next:(res)=>{
        console.log(res)
        const newData=res.data.map((item:any)=>item._id)
        this.wishListData=newData;

      }
    })
    
  }
  addToCart(id:any,element:HTMLButtonElement):void{
    this.Renderer2.setAttribute(element,'disabled','true')
    this._CartService.addToCart(id).subscribe({
      next:(res)=>{
        console.log(res)
        this._ToastrService.success(res.massage)
        this.Renderer2.removeAttribute(element,'disabled')
        this._CartService.cartNumber.next(res.numOfCartItems)
      },
      error:(err)=>{
        this.Renderer2.removeAttribute(element,'disabled')
      }
    }
    )

  }
  addFav(prodId:string):void{
    this._WishlistService.addToWishList(prodId).subscribe({
      next:(res)=>{
        console.log(res)
        this._ToastrService.success(res.massage)
        this.wishListData=res.data
      }
    })

  }
  removeFav(prodId:string):void{
    this._WishlistService.removeWishList(prodId).subscribe({
      next:(res)=>{
        console.log(res)
        this._ToastrService.success(res.massage)
        this.wishListData=res.data
        const newProductsData =this.products.filter((item:any)=>this.wishListData.includes(item._id))
        this.products=newProductsData
      }
    })

  }
}
