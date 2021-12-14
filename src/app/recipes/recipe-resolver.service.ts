import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { DataStorage } from "../shared/data-storage.service";
import { Recipe } from "./recipe.model";
import { RecipeService } from "./recipe.service";

@Injectable( {providedIn: 'root'} )

export class RecipeResolverService implements Resolve<Recipe[]> {
    constructor(private dataStorage: DataStorage, private recipeService: RecipeService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const recipes = this.recipeService.getRecipe();
        if(recipes.length===0) {
            return this.dataStorage.fetchData();
        }
        else {
            return recipes;
        }
        
    }
}