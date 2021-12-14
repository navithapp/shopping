import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, map, take, tap } from 'rxjs/operators';
import { AuthService } from "../auth/auth.service";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";

@Injectable ({providedIn: 'root'})
export class DataStorage {

    constructor(private http: HttpClient, 
                private recipeService: RecipeService,
                private authService: AuthService) {}

    storeRecipes() {
        const recipes = this.recipeService.getRecipe();
        this.http.put('https://shopping-f1b3e-default-rtdb.firebaseio.com/recipes.json', recipes)
        .subscribe((response) => console.log(response));
    }

    fetchData() {
        return this.http.get<Recipe[]>('https://shopping-f1b3e-default-rtdb.firebaseio.com/recipes.json')
            .pipe(map((recipes) => {
                return recipes.map((recipe) => {
                    return {
                        ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []
                    };
                })
            }),
            tap((recipes) => {
                this.recipeService.setRecipes(recipes);
            }) );
    }
}