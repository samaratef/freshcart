import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/core/services/product.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from 'src/app/core/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule,CarouselModule],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  productId!:string|null;
  productDetails:any=null;
  constructor(private _ActivatedRoute:ActivatedRoute ,
    private _ProductService:ProductService,
    private _CartService:CartService,
    private Renderer2:Renderer2,
    private _ToastrService:ToastrService){}
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(pramas)=>{
        this.productId= pramas.get('id')
        console.log(this.productId)

      }
    })
    this._ProductService.getProductDetails(this.productId).subscribe({
      next:({data})=>{
        console.log(data)
        this.productDetails=data
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

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    items:1,
    nav: true
  }
}
