import { registerLocaleData } from "@angular/common";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Subject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { User } from "./auth/user.model";
import {environment} from '../../environments/environment';

export interface AuthResponseData {
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string,
    registered ?: boolean
}

@Injectable( {providedIn: 'root'})
export class AuthService  {

    userSub = new BehaviorSubject<User>(null);
    private tokenExpirationtimer: any;

    constructor(private http: HttpClient, private router:Router) {}

    signUp(email: string, password: string) {
       return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.fireBaseApiKey, {
            email: email,
            password: password,
            returnSecureToken: true
        })
        .pipe(catchError(this.handleError), tap((resData: AuthResponseData) => {
        this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);}
        ));
    }

    signIn(email:string, password: string) {
        return this.http
        .post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.fireBaseApiKey, {
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(catchError(this.handleError), tap((resData: AuthResponseData) => {
            this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);}
            ));
    }

    autoLogin() {
        const userDetails: {
             email: string,
             id: string,
             _token: string,
             _tokenExpirationDate: string
        } = JSON.parse(localStorage.getItem('userData'));
        if(!userDetails) {
            return;
        }
        const loadedUser = new User(userDetails.email,
                                    userDetails.id, 
                                    userDetails._token, 
                                    new Date(userDetails._tokenExpirationDate));
        if(loadedUser.token) {
            this.userSub.next(loadedUser);
            const expirationDuration= 
                new Date(userDetails._tokenExpirationDate).getTime() - 
                new Date().getTime();
            this.autoLogOut(expirationDuration);
        }
    }

    logout() {
        this.userSub.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');
        if(this.tokenExpirationtimer) {
            clearTimeout(this.tokenExpirationtimer);
        }
    }

    autoLogOut(expirationNumber: number) {
        this.tokenExpirationtimer = setTimeout(() => {
            this.logout();
        }, expirationNumber);
    }

    private handleAuthentication(email: string, id: string, token: string, expiresIn: number) {
        const expirationDate = new Date((new Date().getTime())+ (expiresIn*1000));
        const user = new User(email, id, token, expirationDate);
        this.userSub.next(user); 
        this.autoLogOut( expiresIn*1000 );
        localStorage.setItem('userData', JSON.stringify(user));
    }
    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = 'An error occured.';
            if (!errorRes.error || !errorRes.error.error) {
               return throwError (errorMessage);
            } else {
                switch(errorRes.error.error.message) {
                    case 'EMAIL_EXISTS' : 
                        errorMessage = 'Email already exist';
                        break;
                    case 'OPERATION_NOT_ALLOWED' : 
                        errorMessage = 'Invalid password or username';
                        break; 
                    case 'TOO_MANY_ATTEMPTS_TRY_LATER' : 
                        errorMessage = 'Too many attempts! Please try again later';
                        break;
                    case 'EMAIL_NOT_FOUND' : 
                        errorMessage = 'Email not found';
                        break;
                    case 'INVALID_PASSWORDD' : 
                        errorMessage = 'Invalid password';
                        break;
                    case 'USER_DISABLED' : 
                        errorMessage = 'Account has been disabled';
                        break;
                  }
                  return throwError (errorMessage); 
            }
    }

}