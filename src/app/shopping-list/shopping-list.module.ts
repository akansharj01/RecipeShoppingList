import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ShoppingListRoutingModule } from './shopping-list-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [ 
      ShoppingListComponent,
      ShoppingEditComponent
    ],
    imports: [
      CommonModule,
      FormsModule,
      RouterModule,
      ShoppingListRoutingModule,
      SharedModule
    ]
  })
  export class ShoppingListModule { }
  