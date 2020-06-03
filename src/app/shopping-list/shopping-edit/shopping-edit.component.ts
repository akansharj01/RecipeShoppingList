import { Component, OnInit, ViewChild } from '@angular/core';
import { Ingredients } from 'src/app/shared/ingredients.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  constructor(private shoppingListService: ShoppingListService) { }

  @ViewChild('f') slForm: NgForm;

  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredients;

  ngOnInit() {
    this.subscription = this.shoppingListService.startedEditing
    .subscribe((index:number) => {
      this.editMode = true;
      this.editedItemIndex = index;
      this.editedItem = this.shoppingListService.getIngredient(index);
      this.slForm.setValue({
        name: this.editedItem.name,
        amount: this.editedItem.amount
      })
    }
    );
  }
  
  onSubmit(form : NgForm) {
    const newIngredient = new Ingredients(form.value.name, form.value.amount); 
    if (this.editMode) {
      this.shoppingListService.onUpdateUngredients(this.editedItemIndex, newIngredient);
    } else {
      this.shoppingListService.onAddedIngredients(newIngredient);
    }
    this.editMode = false;
    form.reset();
  }

  onDelete() {
    this.onClear();
    this.shoppingListService.onDeleteIngredient(this.editedItemIndex);
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  ngDestroy() {
    this.subscription.unsubscribe();
  }
}
