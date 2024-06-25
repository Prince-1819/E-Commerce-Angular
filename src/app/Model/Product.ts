export interface Product {
    _id: string;
    name: string;
    price: number;
    image: string;
    description: string;
    category:string;
    quantity:number
  }
  

export interface cartProduct{
    product:Product
    user_id:string|null;
    quantity:number
}

export interface Cart{
    cartitems:cartProduct[]
}