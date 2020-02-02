import { Ingredient } from '../../shared/Ingredient.model';
import * as ShoppingListActions from './shopping-list.actions';

const initialState = {
    ingredients:  [
        new Ingredient("Eggplant", 2),
        new Ingredient("Tomatoes", 3),
      ]
};

export function ShoppingListReducer(state = initialState, action: ShoppingListActions.AddIngredient) {
  switch(action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      //make a copy of the state, you cannot change the original
      return {
        ...state,ingredients: [...state.ingredients, action.payload]
      };
      default:
        return state;
    }   
  
}