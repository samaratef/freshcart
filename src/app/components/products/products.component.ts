import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/core/services/cart.service';
import { ProductService } from 'src/app/core/services/product.service';
import { RouterLink } from '@angular/router';
import { CuttextPipe } from 'src/app/core/pipe/cuttext.pipe';
import { product } from 'src/app/core/interfaces/product';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule,CuttextPipe,RouterLink,NgxPaginationModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent  implements OnInit {

constructor(
  private _ProductService:ProductService ,
  private _CartService:CartService,
  private _ToastrService: ToastrService,
  private Renderer2:Renderer2,
){}
products: product[]=[];
pageSize: number=0;
curentPage:number=1
total:number=0;


  ngOnInit(): void {
    this._ProductService.getProducts().subscribe({
      next:(res)=>{
        console.log(res)
        this.products=res.data
        this.pageSize=res.metadata.limit
        this.curentPage=res.metadata.curentPage
        this.total=res.results
      }
  })
  }
  pageChanged(event:any):void{
    console.log(event)
    this._ProductService.getProducts(event).subscribe({
      next:(res)=>{
        console.log(res)
        this.products=res.data
        this.pageSize=res.metadata.limit
        this.curentPage=res.metadata.curentPage
        this.total=res.results
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
}
