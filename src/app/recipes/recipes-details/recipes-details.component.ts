import { Component, OnInit, Input } from '@angular/core';
import { RecipesModel } from '../recipes.model';
import { RecipeService } from '../recipe-service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipes-details',
  templateUrl: './recipes-details.component.html',
  styleUrls: ['./recipes-details.component.css']
})
export class RecipesDetailsComponent implements OnInit {

  constructor(private recipeService: RecipeService, private route: ActivatedRoute,
    private router: Router) { }

  recipe: RecipesModel;
  id: number;

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.recipe = this.recipeService.getRecipe(this.id);
      }
    );
  }

  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDeleteRecipeItem() {
    this.recipeService.deleteRecipeItemFromList(this.id);
    this.router.navigate(['/recipes']);
  }
}
