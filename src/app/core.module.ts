import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './auth/auth/auth-interceptor.service';
import { RecipeService } from './recipes/recipe.service';
import { DataStorageService } from './shared/data-storage.service';
import { RecipesResolverService } from './recipes/recipes-resolver.service';
import { AuthService } from './auth/auth/auth.service';
import { AuthGuard } from './auth/auth/auth.guard';
import { ShoppingListService } from './shopping-list/shopping-list.service';

@NgModule({
    providers: [
        [ShoppingListService, RecipeService, DataStorageService, RecipesResolverService, AuthService, AuthGuard,
            {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }],
    ]
})
export class CoreModule {

}