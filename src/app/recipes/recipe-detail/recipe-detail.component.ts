import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  // @Input() receivedRecipe:Recipe;
  receivedRecipe:Recipe;
  itemIndex:number;

  constructor(private recipeService: RecipeService, private activeRoute: ActivatedRoute, 
    private router: Router) { }

  ngOnInit(): void {
    // this.itemIndex = this.activeRoute.snapshot.params['id'];
    // console.log(this.itemIndex);
    // this.receivedRecipe = this.recipeService.getRecipeByIndex(this.itemIndex);
    this.activeRoute.params.subscribe((params)=>{
      console.log(params['id']);
      if (params['id']) {
        this.itemIndex = +params['id'];
        this.receivedRecipe = this.recipeService.getRecipeByIndex(this.itemIndex);
      }
    })
  }

  addIngredients()
  {
    this.recipeService.addToShoppingList(this.receivedRecipe.ingredients);
  }

  editRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.activeRoute});
  }

  deleteRecipe() {
    this.recipeService.deleteRecipe(this.itemIndex);
    this.router.navigate(['/recipes']);
  }

}
