import { Component, OnInit } from '@angular/core';
import { RecipesModel } from '../recipes.model';
import { RecipeService } from '../recipe-service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector:'recipes-list',
    templateUrl: './recipes-list.component.html',
    styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit{
    constructor(private recipeService: RecipeService,
                private router: Router, private route: ActivatedRoute) { }

    recipes: RecipesModel[];

    ngOnInit() {
        this.recipes = this.recipeService.getRecipes();
    }

    onNewRecipe() {
        this.router.navigate(['new'], {relativeTo: this.route});
    }
}