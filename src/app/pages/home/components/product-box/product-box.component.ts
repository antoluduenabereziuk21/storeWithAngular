import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/pages/models/product.module';

@Component({
  selector: 'app-product-box',
  templateUrl:'./product-box.component.html',
})
export class ProductBoxComponent implements OnInit {
  
  @Input()fullWidthMode = false;
  @Input() product: Product | undefined ;
  
  
  
  
  
  
  /*product: Product | undefined = {
    id: 1,
    title: 'Snickers',
    price:150,
    category:'shoes',
    description:'Description',
    image:'https://via.placeholder.com/150'
  };*/
  @Output() addToCart = new EventEmitter();

  constructor(){}

  ngOnInit(): void {

  }
  onAddToCart():void {
    this.addToCart.emit(this.product);
  }


}
