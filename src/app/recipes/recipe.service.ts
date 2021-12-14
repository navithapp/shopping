import { EventEmitter, Injectable, Output } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";

import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService {

    // recipes: Recipe[] = [
    //     new Recipe("Test Recipe", 
    //         "This is a test recipe",
    //          "https://www.add1tbsp.com/wp-content/uploads/2021/06/20210402-MLMC-Split-Lobster-Herb-Butter1444-scaled.jpg",
    //          [
    //             new Ingredient('meat', 5), new Ingredient('potato', 3)
    //          ]), 
    //     new Recipe("Test Recipe1", 
    //         "This is a test recipe1", 
    //         "https://images.squarespace-cdn.com/content/v1/4f3d96dfd09ad0913f907a5d/1593817652685-44OUI8D1QOM1Z3M5SKW0/20200630-18-iPhone+11+Pro-IMG_1542.jpg?format=1000w",
    //         [new Ingredient('chicken', 5), new Ingredient('chily', 3)])
    //   ]; 
    
    private recipes: Recipe[] = [];

    recipeSelected = new EventEmitter<Recipe>();
    updatedRecipes = new Subject<Recipe[]>();

    constructor(private slService: ShoppingListService) {}

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.updatedRecipes.next(this.recipes.slice());
    }

    getRecipe() {
        return this.recipes.slice();
    }

    // selectRecipe(recipe: Recipe) {
    //     this.recipeSelected.emit(recipe);
    // }

    addToShoppingList(ingredients: Ingredient[]) {
        this.slService.addNewIngredients(ingredients);
    }
    getRecipeByIndex (id:number) {
        return this.recipes[id];
    }

    addNewRecipe(recipe:Recipe) {
        this.recipes.push(recipe);
        this.updatedRecipes.next(this.recipes.slice());
    }

    updateRecipe(index:number, newRecipe:Recipe) {
        this.recipes[index] = newRecipe;
        this.updatedRecipes.next(this.recipes.slice());
    }

    deleteRecipe(index:number) {
        this.recipes.splice(index,1);
        this.updatedRecipes.next(this.recipes.slice());
    }

}