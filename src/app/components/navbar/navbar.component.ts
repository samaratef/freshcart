import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from 'src/app/core/services/cart.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule,RouterLink,RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  cartNumber:number=0
  
  constructor(private _Roter:Router,private _CartService:CartService){}
  ngOnInit(): void {
    this._CartService.cartNumber.subscribe({
      next:(data)=>{
      this.cartNumber=data

      }
    })
    this._CartService.getCartUser().subscribe({
      next:(res)=>{
        this.cartNumber=res.numOfCartItems
      }
    })
  }
  signOut():void{
    localStorage.removeItem('etoken')
    this._Roter.navigate(['/login'])
  }

}
