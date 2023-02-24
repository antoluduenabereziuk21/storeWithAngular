import { Component, Output,EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
 
})
export class FiltersComponent implements OnInit {

  @Output() showCategory = new EventEmitter<string>();

  categories= ['shoes','sports'];

  constructor(){}

  ngOnInit(): void {
    
  }

   onShowCategory(category:string):void {
    // with this method called a ShowCategory wiht emit a event 
    this.showCategory.emit(category);
   }
}
