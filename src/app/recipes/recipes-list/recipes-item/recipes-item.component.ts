import { Component, OnInit, Input } from '@angular/core';
import { RecipesModel } from '../../recipes.model';
import { RecipeService } from '../../recipe-service';

@Component({
  selector: 'app-recipes-item',
  templateUrl: './recipes-item.component.html',
  styleUrls: ['./recipes-item.component.css']
})
export class RecipesItemComponent implements OnInit {

  constructor(private recipeService: RecipeService) { }
  
  @Input() recipesItem : RecipesModel;

  @Input() index: number;

  ngOnInit() {
  }
}
