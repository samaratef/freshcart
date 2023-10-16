import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/core/services/product.service';
import { Category } from 'src/app/core/interfaces/category';

@Component({
  selector: 'app-category-detailes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-detailes.component.html',
  styleUrls: ['./category-detailes.component.scss']
})
export class CategoryDetailesComponent implements OnInit {
  constructor(private _ActivatedRoute:ActivatedRoute,
    private _ProductService:ProductService){}
  categoryId:string|null='';
  categoryDetails:Category={
    name: '',
    image: ''
  }
  
  ngOnInit(): void {
    
    this._ActivatedRoute.paramMap.subscribe({
      next:(pramas)=>{
        this.categoryId=pramas.get('id')
      }
    })
    this._ProductService.getCategoryDetails(this.categoryId).subscribe({
      next:(res)=>{
        this.categoryDetails=res.data

      }
    })
  }

}
