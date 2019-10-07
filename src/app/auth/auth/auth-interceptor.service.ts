import { HttpInterceptor, HttpRequest, HttpHandler, HttpParams } from '@angular/common/http';
import { AuthService } from './auth.service';
import { map, tap, take, exhaustMap } from 'rxjs/operators';

export class AuthInterceptorService implements HttpInterceptor{
    constructor(private authService: AuthService){}

    intercept(req: HttpRequest<any>, next: HttpHandler ) {
         //using the take operator, i am only getting the user once, like subscribing and unsubscribing after one time
        return this.authService.user.pipe(
        take(1),
        exhaustMap(user => {
            if(!user) {
                return next.handle(req);
            }
            const modifiedReq = req.clone({
                params: new HttpParams().set('auth', user.getToken())
            });
            return next.handle(modifiedReq);

        }));

        
    }

}