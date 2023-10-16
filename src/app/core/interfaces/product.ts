export interface product {
    ratingsAverage: number
    title: string
    description: string
    imageCover: string
    category: CategoryProduct
    price:number
    _id:string
    
  }
  
  export interface CategoryProduct {
    name: string
  }
  