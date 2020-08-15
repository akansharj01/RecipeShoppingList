import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RecipesModel } from '../recipes/recipes.model';
import { RecipeService } from '../recipes/recipe-service';
import { map, tap, take, exhaustMap } from 'rxjs/operators';
import { AuthenticationService } from '../authentication/authentication-service';

@Injectable({
    providedIn: 'root'
})
export class DataStorageService {
    constructor(private http: HttpClient, private recipeService: RecipeService,
        private authService: AuthenticationService) { }

    storeRecipe() {
        const recipes = this.recipeService.getRecipes();
        this.http.put("https://ng-course-recipe-book-4ac8a.firebaseio.com/recipe.json", recipes)
            .subscribe(
                (response => {
                    console.log(response);
                })
            );
    }

    fetchRecipeData() {
        return this.http.get<RecipesModel[]>
            ('https://ng-course-recipe-book-4ac8a.firebaseio.com/recipe.json')
            .pipe(map(recipes => {
                return recipes.map(recipe => {
                    return {
                        ...recipe, Ingredients: recipe.ingredients ? recipe.ingredients : []
                    }
                });
            }), tap(recipes => {
                this.recipeService.setRecipe(recipes);
            }));
    }

}