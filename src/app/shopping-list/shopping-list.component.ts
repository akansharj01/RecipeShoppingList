import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredients } from '../shared/ingredients.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  constructor(private shoppingListService: ShoppingListService) { }

  ingredients: Ingredients[];
  private ingChangeSub : Subscription;

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();
    this.ingChangeSub = this.shoppingListService.ingredientsChanged.subscribe( (ing: Ingredients[]) => {
      this.ingredients= ing;
    })
  }

  onEditItem(index : number) {
    this.shoppingListService.startedEditing.next(index);
  }

  ngOnDestroy() {
    this.ingChangeSub.unsubscribe();
  }

}
