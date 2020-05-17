import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { Ingredients } from 'src/app/shared/ingredients.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput') nameInputRef: ElementRef;
  @ViewChild('amountInput') amountInputRef: ElementRef;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
  }
  
  onAddItem() {
    const ingName = this.nameInputRef.nativeElement.value;
    const imgAmount = this.amountInputRef.nativeElement.value;
    const newIngredients = new Ingredients(ingName, imgAmount); 
    this.shoppingListService.onAddedIngredients(newIngredients);
  }
}
