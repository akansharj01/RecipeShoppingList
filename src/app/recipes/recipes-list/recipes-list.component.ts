import { Component, OnInit, OnDestroy } from '@angular/core';
import { RecipesModel } from '../recipes.model';
import { RecipeService } from '../recipe-service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
    selector:'recipes-list',
    templateUrl: './recipes-list.component.html',
    styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit, OnDestroy{
    constructor(private recipeService: RecipeService,
                private router: Router, private route: ActivatedRoute) { }

    recipes: RecipesModel[];
    recipeSub : Subscription;

    ngOnInit() {
        this.recipeSub = this.recipeService.recipeChanged.subscribe(
        (recipe: RecipesModel[]) => {
            this.recipes = recipe;
        }
        );
        this.recipes = this.recipeService.getRecipes();
    }

    onNewRecipe() {
        this.router.navigate(['new'], {relativeTo: this.route});
    }

    ngOnDestroy() {
        this.recipeSub.unsubscribe();
    }
}