import { Recipe } from './recipe.model';
import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {

    recipeSelected = new EventEmitter<Recipe>();

    private recipes: Recipe[] = [
        new Recipe('A test recipe',
            'This is simply a test',
            'https://belleofthekitchen.com/wp-content/uploads/2017/04/oreo-four-layer-dessert-square.jpg',
            [
                new Ingredient('meat', 1),
                new Ingredient('buns', 2)
            ]),
        new Recipe('A next test recipe',
            'This is the next test recipe',
            'https://realfood.tesco.com/media/images/RFO-1400x919-classic-chocolate-mousse-69ef9c9c-5bfb-4750-80e1-31aafbd80821-0-1400x919.jpg',
            [
                new Ingredient('meat', 1),
                new Ingredient('chilli', 1)
            ])
    ]

    constructor(private shoppingLisrService: ShoppingListService) {}

    getRecipes() {
        return this.recipes.slice();
    }

    addIngredients(ingredients: Ingredient[]) {
        this.shoppingLisrService.addIngredients(ingredients);
    }
}