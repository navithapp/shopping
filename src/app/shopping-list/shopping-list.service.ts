import { EventEmitter } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";

export class ShoppingListService {
    
      private ingredients: Ingredient[] = [
        new Ingredient("apples", 5),
        new Ingredient("orange", 5),
        new Ingredient("grape", 5)
      ];
    
      addedNewIngredient = new EventEmitter<Ingredient[]>();
      itemEdited = new Subject<number>();

      getIngredient() {
          return this.ingredients.slice();
      }

      getIngredientByIndex(index:number) {
        return this.ingredients[index];
    }

      addNewIngredient(event: Ingredient)
      {
          this.ingredients.push(event);
          this.addedNewIngredient.emit(this.ingredients.slice());
      }

      addNewIngredients(ingredients: Ingredient[]) {
        this.ingredients.push(...ingredients);
        this.addedNewIngredient.emit(this.ingredients.slice());
      }

      itemToBeEdited(index:number) {
        this.itemEdited.next(index);
      }

      updateIngredient(index:number, ingredient:Ingredient) {
        this.ingredients[index] = ingredient;
        this.addedNewIngredient.emit(this.ingredients.slice());
      }
      deleteIngredient(index:number) {
        this.ingredients.splice(index,1);
        this.addedNewIngredient.emit(this.ingredients.slice());
      }
}