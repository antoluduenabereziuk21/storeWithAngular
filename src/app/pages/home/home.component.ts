import { Component,OnDestroy,OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { StoreService } from 'src/app/services/store.service';
import { Product } from '../models/product.module';

const ROWS_HEIGHT:{[id:number]:number} ={ 1: 400 ,3 : 355, 4:350 }

@Component({
  selector: 'app-home',
  templateUrl:'./home.component.html' ,
  
})
export class HomeComponent implements OnInit,OnDestroy {

  cols= 3;
  rowHeight= ROWS_HEIGHT[this.cols]
  category:string | undefined;
  products:Array<Product> | undefined;
  sort= 'desc';
  count ='12';
  //adedd Subscription from rxjs for use with our service wich is Obsevable
  productSubcription: Subscription |undefined;

  /*  injecting the service that we can just created  storeService (remember import this)*/
  constructor( private cartService: CartService,
               private storeService: StoreService){}
    //the method getProducts start in beginin of our aplication
  ngOnInit():void {
    this.getProducts();
  }
  //And this method is how use the service for getAllProducts
  getProducts(){
    this.productSubcription = this.storeService.getAllProducts(this.count,this.sort).subscribe((_products)=>{
      this.products=_products;
    })
  }
  onColumnCountChanged(colsNum:number):void{
    this.cols= colsNum;
    this.rowHeight= ROWS_HEIGHT[this.cols]
  }
  
  onShowCategory(newCategory:string):void{
    this.category = newCategory;
  }
  /* Now we can use this Service */
  onAddToCart(product:Product):void{
    this.cartService.addToCart({
      product: product.image,
      name: product.title,
      price: product.price,
      quantity:1,
      id: product.id

    })
  }
  /*With this ,in case of wich our product is charge , automatically close the subscription, this is for more eficiense */
  ngOnDestroy(): void {
    if(this.productSubcription){
      this.productSubcription.unsubscribe();
    }
  }
}
