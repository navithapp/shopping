import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('name') name1: ElementRef;
  @ViewChild('amount') amount1: ElementRef;
  @ViewChild('f') slForm:NgForm;

  subscription:Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem:Ingredient;

  ingredient:Ingredient;
 
  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.subscription = this.shoppingListService.itemEdited
      .subscribe((index:number) => {
          this.editMode = true;
          this.editedItemIndex = index;
          this.editedItem = this.shoppingListService.getIngredientByIndex(index);
          this.slForm.setValue( {
            name: this.editedItem.name,
            amount: this.editedItem.amount
          });
      });
  }

  addIngredient(f:NgForm) {
    this.ingredient  = {
      name: f.value.name,
      amount: f.value.amount
    };
    if(this.editMode) {
      this.shoppingListService.updateIngredient(this.editedItemIndex, this.ingredient);
    }
    else {
      this.shoppingListService.addNewIngredient(this.ingredient);
    }
    this.clearForm(f);
  }

  deleteIngredient(f:NgForm) {
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.clearForm(f);
  }

  clearForm(f:NgForm) {
    if(this.editMode) {
      this.editMode = false;
      this.editedItemIndex = null;
    }
    f.reset();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
