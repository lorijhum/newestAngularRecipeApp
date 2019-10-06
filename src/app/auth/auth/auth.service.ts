import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


export interface AuthResponseData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}


export class AuthService {
    constructor(private http: HttpClient) {}
      

    signup(email: string, password: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBjugYEuOTGbRkENSU3snI8ctqBl5FEAOM',
        {
            email: email,
            password: password,
            returnSecureToken: true
        }
        ).pipe(catchError(errorRes => {
            let errorMessage = 'An unknown error occured';
            if(!errorRes.error || !errorRes.error.error) {
                return throwError(errorMessage);
            }
            switch (errorRes.error.error.message) {
                case 'EMAIL_EXISTS':
                  errorMessage = 'This Email already exists'
              }
              return throwError(errorMessage);
        }));
    }

    login(email: string, password: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBjugYEuOTGbRkENSU3snI8ctqBl5FEAOM ',
        {
            email: email,
            password: password,
            returnSecureToken: true
        }
        ).pipe(catchError(errorRes => {
            let errorMessage = 'An unknown error occured';
            if(!errorRes.error || !errorRes.error.error) {
                return throwError(errorMessage);
            }
            switch (errorRes.error.error.message) {
                case 'EMAIL_NOT_FOUND':
                  errorMessage = 'This Email does not exist'
                 case 'INVALID_PASSWORD':
                    errorMessage = 'Wrong password entered'  
              }
              return throwError(errorMessage);
        }));
    }

}