import { Injectable } from '@angular/core';
import { RecipesModel } from './recipes.model';
import { DataStorageService } from '../shared/data-storage-service';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { RecipeService } from './recipe-service';

@Injectable(
    {
        providedIn : 'root'
    }
)
export class RecipeResolverService implements Resolve<RecipesModel[]> {
    constructor(private dataStorageService : DataStorageService,
        private recipeService: RecipeService) {}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const recipes = this.recipeService.getRecipes();
        if(recipes.length === 0) {
            return this.dataStorageService.fetchRecipeData();
        } else {
            return recipes;
        }
        
    }
    
}