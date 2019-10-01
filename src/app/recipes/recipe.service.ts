import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/Ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';


export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();
    //now that are recipes are stored on the server, we don't need to create these every time
    /* private recipes: Recipe[] = [
        new Recipe('Mario Malta', 'Eggplant dinner', 
        'https://ccs1-jl7jxm3ukfwyutip.netdna-ssl.com/wp-content/uploads/2018/09/garlic-parmesan-eggplant-recipe-4.jpg',
        [
          new Ingredient('eggplant', 2),
          new Ingredient('tomatoes', 4)
        ]),
        new Recipe("Meatloaf", "Meatloaf dinner", 
        "https://natashaskitchen.com/wp-content/uploads/2019/02/Meatloaf-Recipe-768x1152.jpg",
        [
          new Ingredient('beef', 1),
          new Ingredient('potatoes', 4)
        ])
      ]; */

      private recipes: Recipe[] = [];

      constructor(private shoppingListService: ShoppingListService){}

    setRecipes(recipes: Recipe[])  {
      this.recipes = recipes;
      this.recipesChanged.next(this.recipes.slice());
    }

    getRecipes() {
      //adding slice returns a copy of the array
      return this.recipes.slice();
  }  
  
  getRecipe(index: number) {
    return this.recipes[index];
  }
  
  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);

  }
  addRecipe(recipe: Recipe) {
  this.recipes.push(recipe);
  this.recipesChanged.next(this.recipes.slice());
  }
  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }
  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
    
}