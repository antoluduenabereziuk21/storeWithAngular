import { Component,OnInit } from '@angular/core';
import {Cart, CartItem} from 'src/app/pages/models/cart.model' 
import { CartService } from 'src/app/services/cart.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
})
export class CartComponent implements OnInit {

  cart: Cart = {items:[
    {
      product: 'https://via.placeholder.com/150',
      name: 'snickers',
      price: 150,
      quantity: 1,
      id: 1,
    },
    {
      product: 'https://via.placeholder.com/150',
      name: 'snickers',
      price: 150,
      quantity: 3,
      id: 2,
    }
  ]}

  dataSource:Array<CartItem> = [];
  displayedColumns:Array<string> = [
    'product',
    'name', 
    'price',
    'quantity',
    'total',
    'action'

  ];

  constructor(private cartService: CartService){}

  ngOnInit(): void {
    /* Now we want to susbcribe to our new  created  cart item , 
    so let's just call this cartService , get back a new cart  
    to update our cart with this new one , for then show this information in our cart*/
    this.cartService.cart.subscribe((_cart:Cart)=>{
      this.cart = _cart;
      this.dataSource = this.cart.items;
    })
  }

  getTotal(items:Array<CartItem>): number {
    
     return this.cartService.getTotal(items);
    //return items.map((item)=> item.price * item.quantity).
    //reduce((prev ,current)=> prev + current,0);
  }
  /*we reuse the method clearCart for clean our cart */
  onClearCart():void {
    this.cartService.clearCart();
  }
  onRemoveFromCart(item:CartItem):void {
    this.cartService.removeFromCart(item);
  }
  onAddQuantity(item :CartItem):void {
    this.cartService.addToCart(item);
  }
  onRemoveQuantity(item :CartItem):void {
    this.cartService.removeQuantity(item);
  }
}
