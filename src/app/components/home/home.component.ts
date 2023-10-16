import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from 'src/app/core/services/product.service';
import { product } from 'src/app/core/interfaces/product';
import { CuttextPipe } from 'src/app/core/pipe/cuttext.pipe';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Category } from 'src/app/core/interfaces/category';
import { RouterLink } from '@angular/router';
import { CartService } from 'src/app/core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { SearchPipe } from 'src/app/core/pipe/search.pipe';
import { FormsModule} from '@angular/forms';
import { WishlistService } from 'src/app/core/services/wishlist.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,CuttextPipe,CarouselModule,RouterLink,SearchPipe,FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  constructor(private _ProductService:ProductService ,
  private _CartService:CartService,
  private _ToastrService: ToastrService,
  private Renderer2:Renderer2,
  private _WishlistService:WishlistService){}
  products: product[]=[];
  categories:Category[]=[];
  term:string='';
  wishListData:string[]=[]
  
  

  ngOnInit(): void {
    this._ProductService.getProducts().subscribe({
      next:(res)=>{
        console.log(res)
        this.products=res.data
      }
  })
    this._ProductService.getCategories().subscribe({
      next:(res)=>{
        this.categories=res.data

      }
    })
    this._WishlistService.getWishList().subscribe({
      next:(res)=>{
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
      }
    })

  }
  categoryOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    autoplay:true,
    autoplayTimeout:6000,
    autoplaySpeed:1000,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 4
      },
      940: {
        items: 6
      }
    },
    nav: true
  }
  sliderOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    autoplay:true,
    autoplayTimeout:2000,
    autoplaySpeed:1000,
    navText: ['', ''],
    nav: true,
    items:1
  }

}
