import { Component, OnInit } from '@angular/core';
import { Cart } from './pages/models/cart.model';
import { CartService } from './services/cart.service';
@Component({
  selector: 'app-root',
  /*  Now what we can do here is we can use this cart and pass that 
  to our header component <app-header [cart]="cart"></app-header>
  */
  template: `
  <app-header [cart]="cart"></app-header>
  <router-outlet></router-outlet>
  `,
})
export class AppComponent implements OnInit {
  /*first create anew cart property the type Cart and let's add 
  the default value
  Now we want to implement the NgOnInit, and we  want include our 
  cart service in the constructor*/
  cart : Cart ={ items :[]};

  constructor(private cartService: CartService){}
  /*Now when the component is initializing we want to call cart service
    and we want to subscribe to our cart Service and it will receive back
    a card once it gets updated*/
  ngOnInit(){
    this.cartService.cart.subscribe((_cart) => {
      this.cart = _cart;
    });
  }
}
