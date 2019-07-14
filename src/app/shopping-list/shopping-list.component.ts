import { Component, OnInit } from '@angular/core';
import { Ingredient} from '../shared/Ingredient.model'

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[] = [
    new Ingredient("Eggplant", 2),
    new Ingredient("Tomatoes", 3),
  ];

  constructor() { }

  ngOnInit() {
  }

}
