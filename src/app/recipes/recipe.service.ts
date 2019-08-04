import { Recipe } from './recipe.model';
import { EventEmitter } from '@angular/core';


export class RecipeService {
    private recipes: Recipe[] = [
        new Recipe('Mario Malta', 'Eggplant dinner', 'https://ccs1-jl7jxm3ukfwyutip.netdna-ssl.com/wp-content/uploads/2018/09/garlic-parmesan-eggplant-recipe-4.jpg'),
        new Recipe("Meatloaf", "Meatloaf dinner", "https://natashaskitchen.com/wp-content/uploads/2019/02/Meatloaf-Recipe-768x1152.jpg")
      ];

   recipeSelected = new EventEmitter<Recipe>();  

  getRecipes() {
      //adding slice returns a copy of the array
      return this.recipes.slice();
  }    
    
}