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
}