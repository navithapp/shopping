import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  // providers: [RecipeService]
})
export class RecipesComponent {

  // selectedRecipe:Recipe;  
  // constructor(private recipeService: RecipeService) { }

  // ngOnInit(): void {
  //   this.recipeService.recipeSelected.subscribe((event) => {
  //     this.onRecipeReceived(event);
  //   })
  // }

  // onRecipeReceived(event: Recipe){
  //   this.selectedRecipe=event;
  // }

}
