import { Ingredient } from '../../shared/Ingredient.model';
import * as ShoppingListActions from './shopping-list.actions';

export interface AppState {
  shoppingList: State;
}

export interface State {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
}

const initialState: State = {
    ingredients:  [
        new Ingredient("Eggplant", 2),
        new Ingredient("Tomatoes", 3),
      ],
      editedIngredient: null,
      editedIngredientIndex: -1,
};

export function ShoppingListReducer(state: State = initialState, action: ShoppingListActions.ShoppingListActions) {
  switch(action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      //make a copy of the state, you cannot change the original
      return {
        ...state,ingredients: [...state.ingredients, action.payload]
      };
      case ShoppingListActions.ADD_INGREDIENTS:
        return {
          ...state,ingredients: [...state.ingredients, ...action.payload]
        };
        case ShoppingListActions.UPDATE_INGREDIENT:
          //make a copy of the state, then edit the copy
          const ingredient = state.ingredients[state.editedIngredientIndex];
          const updatedIngredient = {
            ...ingredient,
            ...action.payload
          };
          const updatedIngredients = [...state.ingredients];
          updatedIngredients[state.editedIngredientIndex] = updatedIngredient;
          return {
            ...state, ingredients: updatedIngredients,
            editedIngredientIndex: -1,
            editedIngredient: null

          };
          case ShoppingListActions.DELETE_INGREDIENT:
            //filter will run on every ingredient, and when true makes a copy of that ingredient, and when false, does not
            //so we filter out the ingredient that we want to delete
            return {
              ...state, ingredients: state.ingredients.filter((ig, igIndex) => {
                return igIndex != state.editedIngredientIndex;
              })
            };
            case ShoppingListActions.START_EDIT:
              return {
                  ...state,
                  editedIngredientIndex: action.payload,
                  editedIngredient: {...state.ingredients[action.payload]}
              };
              case ShoppingListActions.STOP_EDIT:
                return {
                  ...state,
                  editedIngredient: null,
                  editedIngredientIndex: -1
                }
      default:
        return state;
    }   
  
}