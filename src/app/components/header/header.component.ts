import { Component, Input, OnInit } from '@angular/core';
import { Cart, CartItem } from 'src/app/pages/models/cart.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl:'./header.component.html',
})
export class HeaderComponent {

  /*what we are going to have in this component is we're going to have cart 
  which is going to be subscribed in the home component and
   passed in this header component */
  private _cart:Cart = { items:[]};
  /*another thing  the we need is the items quantity */
  itemsQuantity = 0;
  
  /**here we want to receive the actual cart ,so we will have an input, 
   * and we will create a getter and setter ,that's why we're using card, 
   * because is the naming convention that usually programmers do,
   * when you have underscode cart it means this is private field */
  @Input()
  /*get our cart which id type of cart, and we will just return this cart 
  this is the getter*/
  get cart():Cart { 
    return this._cart;
  }
  /*now let's set the setter , so to set cart, fill the receiver cart  type of cart, 
    and also every time that card  changeswe want to update this item quantity */
  set cart(cart:Cart) {
    this._cart = cart;
    //so what we can do is use this item quantity and we can loop  cart items.
    this.itemsQuantity= cart.items
    //first we get the object with different fields,but we only need the quantity */
    .map(item => item.quantity)
    /*we can use  reduce uses the previous and current values. 
    and need to set the initial value which is 0, in this case and al we do is
     we use and add the previos value with the cuurent value*/
    .reduce((prev,current)=> prev + current,0)
  }

  constructor(private cartServices: CartService){}

 

  getTotal(items:Array<CartItem>): number {
    
    return this.cartServices .getTotal(items);
 }

 onClearCart() {
  this.cartServices.clearCart();
  }
}
