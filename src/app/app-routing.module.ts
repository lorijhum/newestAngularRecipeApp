import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { AuthComponent } from './auth/auth/auth.component';

const appRoutes: Routes = [
    {path: '', redirectTo: '/recipes', pathMatch: 'full'},
    {path: 'auth', component: AuthComponent}
  
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