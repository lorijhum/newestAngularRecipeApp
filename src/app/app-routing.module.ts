import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';

const appRoutes: Routes = [
    {path: '', redirectTo: '/recipes', pathMatch: 'full'}
    
  
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