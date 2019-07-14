import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe('Mario Malta', 'Eggplant dinner', 'https://ccs1-jl7jxm3ukfwyutip.netdna-ssl.com/wp-content/uploads/2018/09/garlic-parmesan-eggplant-recipe-4.jpg'),
    new Recipe("Meatloaf", "Meatloaf dinner", "https://natashaskitchen.com/wp-content/uploads/2019/02/Meatloaf-Recipe-768x1152.jpg")
  ];

  constructor() { }

  ngOnInit() {
  }

}
