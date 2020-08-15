import { RecipesModel } from './recipes.model';
import { EventEmitter, Injectable } from '@angular/core';
import { Ingredients } from '../shared/ingredients.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {
constructor(private shoppingListService: ShoppingListService) {}

    recipeChanged = new Subject<RecipesModel[]>();
    private recipes: RecipesModel[]  = [];
    //     [new RecipesModel("Tasty Schnitzel",
    //      "A super tasty Schnitzel - Just Awesome",
    //      "https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG",
    //      [
    //          new Ingredients('Burger', 5),
    //          new Ingredients('Sandwich', 2)
    //     ]),
    //     new RecipesModel("this is Chocolate Cake", 
    //     "A super tasty Chocolate Cake - Just Awesome",
    //     "https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg",
    //     [
    //         new Ingredients('Breads', 4),
    //         new Ingredients('French Fries', 8)
    //    ])
    // ];
    
    public getRecipes() {
        return this.recipes.slice();
    }

    public getRecipe(index: number) {
        return this.recipes[index];
    }

    public setRecipe(recipe: RecipesModel[]) {
        this.recipes = recipe;
        this.recipeChanged.next(this.recipes.slice());
    }
    addIngredientsToShoppingList(ingredients: Ingredients[]) {
        this.shoppingListService.onAddedIngredientsFromRecipe(ingredients);
    }

    addRecipe(recipe: RecipesModel) {
        this.recipes.push(recipe);
        this.recipeChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: RecipesModel) {
        this.recipes[index] = newRecipe;
        this.recipeChanged.next(this.recipes.slice());
    }

    deleteRecipeItemFromList(index: number) {
        this.recipes.splice(index, 1);
        this.recipeChanged.next(this.recipes.slice());
    }
}