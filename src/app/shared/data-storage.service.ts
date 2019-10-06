import { HttpClient, HttpParams } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { map, tap, take, exhaustMap } from 'rxjs/operators';
import { AuthService } from '../auth/auth/auth.service';

export class DataStorageService {
    constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService) {}

 storeRecipes() {
     const recipes = this.recipeService.getRecipes();
     //since we are overwriting ALL our recipes, firebase gives us a put command to use to replace all data
     //if we were sending one recipe we would use post
     this.http.put('https://ng-course-recipe-book-6df68.firebaseio.com/recipes.json', recipes)
     .subscribe(response => {
         console.log(response);
     })
 } 
 fetchRecipes() {
     //using the take operator, i am only getting the user once, like subscribing and unsubscribing after one time
     return this.authService.user.pipe(
        take(1),
        exhaustMap(user => {
            return this.http.get<Recipe[]>(
                'https://ng-course-recipe-book-6df68.firebaseio.com/recipes.json',
                {
                   params: new HttpParams().set('auth', user.getToken()) 
                }
            );
        }),
        map(recipes => {
            return recipes.map(recipe => {
                return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
            });
        }),
        tap(recipes => {
          this.recipeService.setRecipes(recipes);
        })
      );
    }
  }
      