import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/Ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';


export class RecipeService {
    private recipes: Recipe[] = [
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
      ];

      constructor(private shoppingListService: ShoppingListService){}

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
    
}