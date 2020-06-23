import { Recipe } from '../recipe.model';
import * as RecipeActions from './recipe.actions';

export interface State {
  recipes: Recipe[];
}

const initialState: State = {
  recipes: [],
};

export function RecipeReducer(
  state = initialState,
  action: RecipeActions.RecipeActions
) {
  switch (action.type) {
    case RecipeActions.SET_RECIPES:
      return {
        ...state,
        recipes: [...action.payload],
      };
    case RecipeActions.ADD_RECIPES:
      return {
        ...state,
        recipes: [...state.recipes, action.payload],
      };
    case RecipeActions.UPDATE_RECIPES:
      const updatedRecipe = {
        ...state.recipes[action.payload.index],
        ...action.payload,
      };
      const updatedRecipes = [...state.recipes];
      updatedRecipes[action.payload.index] = updatedRecipe;
      return {
        ...state,
        recipes: updatedRecipes,
      };
    case RecipeActions.DELETE_RECIPES:
      return {
        ...state,
        recipes: state.recipes.filter((recipe, index) => {
          return index !== action.payload.id;
        }),
      };
    default:
      return state;
  }
}
