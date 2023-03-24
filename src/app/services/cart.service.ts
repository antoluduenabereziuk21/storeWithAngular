import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
import { Cart, CartItem } from '../pages/models/cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  /*BehaviorSubject is a special type of observable  that allows the transmission 
  of multiple values ​​to many simultaneous observables and where the current value 
  is always stored and remains available. That is why every time a new consumer 
  subscribes to the data, they will always receive the current value 
  (this is the main difference from the observable standard).
    */
  cart = new BehaviorSubject<Cart>({items: [],});

  constructor(private _snackBar: MatSnackBar) { }

  addToCart(item: CartItem): void {
    /* this  cart = new BehaviorSubject<Cart>({items: [],}); orginal cart object
      so we can destructure the cart and create a new object ,
      and we can just go refrence to this car value. We're accessing this BehaviorSubject
      const items =[...this.cart.value.items]
      
     */
    const items =[...this.cart.value.items]

    /* Now we can find the actual item, because when we're adding items
    inside if this cart we could be adding the same product multiple times */

    const itemInCart = items.find((_item)=> _item.id === item.id);
    
    /* So we just want to increase the quantity and 
    if there is no such product inside of the cart,we just want add it  */
    if (itemInCart){
      itemInCart.quantity +=1;
    }else{
      items.push(item);
    }
    /*and what we want to do at the ar this very end this cart,
     we just want to emit this value so that every single component 
     that is subscribed to the cart can catch value 
     */
    this.cart.next({ items: items});
    /*now what we want do is we want to open up the snack bar , 
      this it that service that displays the user's information,
      **the first argument we want pass a text,
      **the secound argument we want to pass ,
      the text tath you want to show on the button,
      **& the third argument is a object and we cant set the duration(in milliseconds) of 
      this pop-up of the snack bar it's gonna close
    */
    this._snackBar.open('1 item added to cart','ok',{duration: 3000});

  }

  getTotal(items:Array<CartItem>): number {
    return items.map((item)=> item.price * item.quantity).
                reduce((prev ,current)=> prev + current,0);
  }

  clearCart():void{
    this.cart.next({items: []});
    this._snackBar.open('Cart is cleared','ok',{duration: 3000});
  }

  removeFromCart(item: CartItem):void { 
    const filteredItems =this.cart.value.items.filter(
      (_item)=> _item.id !==item.id);

    this.cart.next({items: filteredItems});
    this._snackBar.open('1 item remove from cart','ok',{duration: 3000});
  }
}
