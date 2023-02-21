import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl:'./home.component.html' ,
  styles: [
  ]
})
export class HomeComponent {

  cols= 3;
  constructor(){

  }

  ngOnInit():void {

  }
  onColumnCountChanged(colsNum:number):void{
    this.cols= colsNum;
  }

}
