import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';

export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot): 
       boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree>{
        /* return this.authService.user.pipe(map(user => {
            return !!user;
        })); */
        if(this.authService.isLoggedIn === false) {
            console.log('user is not logged in')
          //  return false;
              return this.router.createUrlTree(['/auth']);
        }else {
            console.log('user is logged in'); 
            console.log(this.authService.user);
            return true;
        }
        
    
    }

}