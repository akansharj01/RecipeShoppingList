import { Ingredients } from '../shared/ingredients.model';
import { Subject } from 'rxjs';

export class ShoppingListService {
    private ingredients: Ingredients[] = [
        new Ingredients('Apples', 5),
        new Ingredients('Mangoes', 10)
      ];

      ingredientsChanged = new Subject<Ingredients[]>();
      startedEditing = new Subject<number>();

      getIngredients() {
          return this.ingredients.slice();
      }

      getIngredient(index: number) {
        return this.ingredients[index];
      }
      onAddedIngredients(ingredient : Ingredients) {
        this.ingredients.push(ingredient);
        this.ingredientsChanged.next(this.ingredients.slice());
      }

      onAddedIngredientsFromRecipe(ing: Ingredients[]) {
          this.ingredients.push(...ing);
          this.ingredientsChanged.next(this.ingredients.slice());
      }

      onUpdateUngredients(index:number, newIng: Ingredients) {
        this.ingredients[index] = newIng;
        this.ingredientsChanged.next(this.ingredients.slice());
      }

      onDeleteIngredient(index: number) {
        this.ingredients.splice(index,1);
        this.ingredientsChanged.next(this.ingredients.slice());
      }
}