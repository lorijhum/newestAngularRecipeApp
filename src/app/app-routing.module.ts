import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';

const appRoutes: Routes = [
    {path: '', redirectTo: '/recipes', pathMatch: 'full'},
    {path: 'recipes', loadChildren: './recipes/recipes.module#RecipesModule' },
    {path: 'shopping-list', loadChildren: './shopping-list/shopping-list.module#ShoppingListModule' }
    
  
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