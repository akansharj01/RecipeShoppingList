import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipesComponent } from './recipes.component';
import { AuthGuard } from '../authentication/auth.guard';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipesDetailsComponent } from './recipes-details/recipes-details.component';
import { RecipeResolverService } from './recipe-resolver-service';
import { RecipesListComponent } from './recipes-list/recipes-list.component';
import { RecipesItemComponent } from './recipes-list/recipes-item/recipes-item.component';
import { ErrorComponent } from '../shared/Error/error-component';

const routes: Routes = [
        {
        path: '', component: RecipesComponent, 
        canActivate: [AuthGuard],
        children: [
            { path: '', component: RecipeStartComponent },
            { path: 'new', component: RecipeEditComponent },
            { path: ':id', component: RecipesDetailsComponent, resolve: [RecipeResolverService] },
            { path: ':id/edit', component: RecipeEditComponent, resolve: [RecipeResolverService] },
            { path: 'recipeList', component: RecipesListComponent },
            { path: 'recipeItem', component: RecipesItemComponent }
        ]
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
}
)
export class RecipeRoutingModule {

}