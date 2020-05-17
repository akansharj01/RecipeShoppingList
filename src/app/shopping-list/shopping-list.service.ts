import { Ingredients } from '../shared/ingredients.model';
import { EventEmitter } from '@angular/core';

export class ShoppingListService {
    private ingredients: Ingredients[] = [
        new Ingredients('Apples', 5),
        new Ingredients('Mangoes', 10)
      ];

      ingredientsChanged = new EventEmitter<Ingredients[]>();
      
      getIngredients() {
          return this.ingredients.slice();
      }

      onAddedIngredients(ingredient : Ingredients) {
        this.ingredients.push(ingredient);
        this.ingredientsChanged.emit(this.ingredients.slice());
      }

      onAddedIngredientsFromRecipe(ing: Ingredients[]) {
          this.ingredients.push(...ing);
          this.ingredientsChanged.emit(this.ingredients.slice());
      }
}