import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';
import { DataStorageService } from 'src/app/shared/data-storage.service';


export interface AuthResponseData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}


export class AuthService {
    user = new BehaviorSubject<User>(null);
    private tokenExpirationTimer: any;
    isLoggedIn = false;
   
    constructor(private http: HttpClient, private router: Router) {}
      

    signup(email: string, password: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBjugYEuOTGbRkENSU3snI8ctqBl5FEAOM',
        {
            email: email,
            password: password,
            returnSecureToken: true
        }
        ).pipe(catchError(this.handleError), 
            tap(resData => {
            this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);   
            
        })
        );
    }

    login(email: string, password: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBjugYEuOTGbRkENSU3snI8ctqBl5FEAOM ',
        {
            email: email,
            password: password,
            returnSecureToken: true
        }
        ).pipe(catchError(this.handleError),
            tap(resData => {
            this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);   
            
        })
        );
    }

    logout() {
        this.isLoggedIn = false;
        this.user.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');
        if(this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
    }

    autoLogout(expirationDuration: number) {
        console.log(expirationDuration);
        this.tokenExpirationTimer = setTimeout(() => {
            this.logout();
        }, expirationDuration)
    }

    private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
        const expirationDate = new Date(
            new Date().getTime() + expiresIn * 1000
            );
        const user = new User(
            email, 
            userId, 
            token, 
            expirationDate
            );
        this.user.next(user);
        this.autoLogout(expiresIn * 1000);
        //here we store the user in local storage so that if we reload the page, we don't have to login again
        //angular loses the user data whenever the page reloads, so to keep that, we are storing it in local storage
        //we need the user, but we have to convert the user object to a string so we can store it
        localStorage.setItem('userData', JSON.stringify(user));
        this.isLoggedIn = true;

    }

    autoLogin() {
        //here we convert the string back to an object
        const userData: {
            email: string; 
            id: string;
            _token: string; 
            _tokenExpirationDate: string;
            } = JSON.parse(localStorage.getItem('userData'));

        if(!userData) {
            return;
        }

        const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));

        if(loadedUser.getToken() != null) {
            this.user.next(loadedUser);
            const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
            this.autoLogout(expirationDuration);
        }

    }

    
    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = 'An unknown error occured';
        if(!errorRes.error || !errorRes.error.error) {
             return throwError(errorMessage);
         }
         switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage = 'This Email already exists';
                break;
              case 'EMAIL_NOT_FOUND':
                 errorMessage = 'This Email does not exist';
                 break;
              case 'INVALID_PASSWORD':
                    errorMessage = 'Wrong password entered'; 
                    break; 
            }
           return throwError(errorMessage);

    }

}