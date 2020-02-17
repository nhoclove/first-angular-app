import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes: Recipe[] = [
    new Recipe('A test recipe', 'This is simply a test', 'https://belleofthekitchen.com/wp-content/uploads/2017/04/oreo-four-layer-dessert-square.jpg'),
    new Recipe('A next test recipe', 'This is the next test recipe', 'https://realfood.tesco.com/media/images/RFO-1400x919-classic-chocolate-mousse-69ef9c9c-5bfb-4750-80e1-31aafbd80821-0-1400x919.jpg')
  ]
  constructor() { }

  ngOnInit(): void {
  }
}
