import { NgModule } from '@angular/core';
import { RecipesComponent } from './recipes.component';
import { RecipesDetailsComponent } from './recipes-details/recipes-details.component';
import { RecipesListComponent } from './recipes-list/recipes-list.component';
import { RecipesItemComponent } from './recipes-list/recipes-item/recipes-item.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RecipeRoutingModule } from './recipe-routing.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ErrorComponent } from '../shared/Error/error-component';


@NgModule({
    declarations: [
        RecipesComponent,
        RecipesDetailsComponent,
        RecipesListComponent,
        RecipesItemComponent,
        RecipeStartComponent,
        RecipeEditComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule,
        RecipeRoutingModule,
        SharedModule
      ]
})
export class RecipeModule {

}