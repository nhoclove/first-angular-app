import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import * as ShoppingListActions from './../shopping-list/store/shopping-list.actions';
import * as fromApp from '../store/app.reducer';
@Injectable()
export class RecipeService {
    recipeChanged = new Subject<Recipe[]>();
    
    private recipes: Recipe[] = [];

    constructor(
        private shoppingLisrService: ShoppingListService,
        private store: Store<fromApp.AppState>
    ) {}

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipeChanged.next(this.recipes.slice());
    }

    getRecipes() {
        return this.recipes.slice();
    }

    getRecipe(index: number) {
        return this.recipes[index];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
    }

    addIngredients(ingredients: Ingredient[]) {
        this.shoppingLisrService.addIngredients(ingredients);
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipeChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipeChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipeChanged.next(this.recipes.slice());
    }
}
  