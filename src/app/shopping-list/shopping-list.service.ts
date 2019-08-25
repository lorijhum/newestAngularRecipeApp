import { EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/Ingredient.model';

export class ShoppingListService {
    private ingredients: Ingredient[] = [
        new Ingredient("Eggplant", 2),
        new Ingredient("Tomatoes", 3),
      ]; 

  ingredientChanged = new EventEmitter<Ingredient[]>();    

  getIngredients() {
      return this.ingredients.slice();
  } 
  
  addIngredient(ingredient: Ingredient) {
      this.ingredients.push(ingredient);
      this.ingredientChanged.emit(this.ingredients.slice());

  }

  addIngredients(ingredients: Ingredient[]) {
    // we could use a for loop to add the ingredients, but this would emit an event for each ingredient added
    // therefore we are using the code  below to push the entire array at one time

      // for (let ingredient of Ingredient) {
      //     this.addIngredient(ingredient);
     // }
      this.ingredients.push(...ingredients);
      this.ingredientChanged.emit(this.ingredients.slice());
  }
}