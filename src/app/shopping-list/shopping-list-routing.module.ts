import { Routes, RouterModule } from '@angular/router';
import { ShoppingListComponent } from './shopping-list.component';
import { NgModule } from '@angular/core';

const slRoutes: Routes = [
    {
        path: '', component: ShoppingListComponent
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(slRoutes)
    ],
    exports: [
        RouterModule
    ]
}
)
export class ShoppingListRoutingModule {

}