import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, take, exhaustMap } from 'rxjs/operators';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { AppSettings } from '../app-settings';
import { AuthService } from '../auth/auth.service';

@Injectable({providedIn: 'root'})
export class DataStorageService {
    constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService) {}

    storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        this.http.put(
            AppSettings.FIREBASE_PROJECT_URL + '/recipes.json',
            recipes,
        ).subscribe(
            response => {
                console.log(response);
            }
        );
    }

    fetchRecipes() {
        return this.http.get<Recipe[]>(
            AppSettings.FIREBASE_PROJECT_URL + '/recipes.json',
        ).pipe(
            map(recipes => {
                return recipes.map(recipe => {
                    return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
                });
            })).subscribe(recipes => {
                this.recipeService.setRecipes(recipes);
            }
        );
    }
}
