import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component';

const appRoutes: Routes = [
    {path: '', redirectTo: '/recipes', pathMatch: 'full'},
    {path: 'recipes', component: RecipesComponent, children: [
        { path: ':id', component: RecipeItemComponent }
    ]
        },
    {path: 'shopping-list', component: ShoppingListComponent}
  
  ]

@NgModule({
    imports: [
      //use the hash set to true if you can't get it to work after deployment
    //  RouterModule.forRoot(appRoutes, {useHash: true})
      RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
  })

export class AppRoutingModule {

    

}