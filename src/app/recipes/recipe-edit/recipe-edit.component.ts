import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id:number;
  editMode = false;
  recipeForm:FormGroup;

  constructor(private activeRoute: ActivatedRoute, private recipeService:RecipeService, private router:Router) { }

  ngOnInit(): void {
    this.activeRoute.params
    .subscribe((params)=> {
      this.id = +params['id'];
      this.editMode = params['id'] != null; 
      console.log(this.editMode);
      this.initForm();
    })
  }

  submitForm() {
    if(this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value)
    } else {
      this.recipeService.addNewRecipe(this.recipeForm.value);
    }
    this.router.navigate(['/recipes']);
  }

  initForm() {
    let recipeName:string = '';
    let recipeImagePath:string = '';
    let recipeDescription:string = '';
    let recipeIngredients =  new FormArray([]);
    
    if(this.editMode)
    {
      const recipe = this.recipeService.getRecipeByIndex(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      if(recipe['ingredients']) {
        for(let ingredient of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup( {
              name: new FormControl(ingredient.name, Validators.required),
              amount: new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[0-9]+[0-9]*$/)])
            })
          );
        }
      }
     
    }

    this.recipeForm = new FormGroup( {
      'name':new FormControl(recipeName, Validators.required),
      'imagePath':new FormControl(recipeImagePath, Validators.required),
      'description':new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients     
    })

  }

  get controls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  addNewIngredient() {
    (<FormArray>this.recipeForm.get("ingredients")).push(
      new FormGroup( {
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]+[0-9]*$/)])
      })
    )

  }
  removeIngredient(index:number) {
    (<FormArray>this.recipeForm.get("ingredients")).removeAt(index);
  }

}
