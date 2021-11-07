import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes: Recipe[] = [
    new Recipe("Test Recipe", "This is a test recipe", "https://www.add1tbsp.com/wp-content/uploads/2021/06/20210402-MLMC-Split-Lobster-Herb-Butter1444-scaled.jpg"), 
    new Recipe("Test Recipe1", "This is a test recipe1", "https://images.squarespace-cdn.com/content/v1/4f3d96dfd09ad0913f907a5d/1593817652685-44OUI8D1QOM1Z3M5SKW0/20200630-18-iPhone+11+Pro-IMG_1542.jpg?format=1000w")
  ]; 

  constructor() {
  }

  ngOnInit(): void {
  }

}
