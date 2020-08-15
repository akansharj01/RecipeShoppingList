import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { ErrorComponent } from './shared/Error/error-component';

const appRoutes: Routes = [
    { path: '', redirectTo: '/recipes', pathMatch: 'full' },
    {path: 'recipes', loadChildren: './recipes/recipe.module#RecipeModule'},
    {path: 'shopping-list', loadChildren: './shopping-list/shopping-list.module#ShoppingListModule'},
    {path: 'auth', loadChildren: './authentication/auth.module#AuthModule'},
    {path: '**', component: ErrorComponent}
]

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [
        RouterModule
    ]
}
)
export class AppRoutingModule {

}