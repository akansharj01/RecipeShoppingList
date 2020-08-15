import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Subject, BehaviorSubject } from 'rxjs';
import { User } from './user';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable ({
    providedIn: 'root'
})
export class AuthenticationService {
    constructor(private http: HttpClient, private router: Router) {}

    userSub = new BehaviorSubject<User>(null);
    tokenExpirationTimer: any

    signUp(email: String, password: String) {
        return this.http.post<AuthResponseData>("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + environment.fireBaseKey,
        {
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(catchError(this.handleError),
        tap(resData => {
           this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
        }));
    }

    login(email: String, password: String) {
        return this.http.post<AuthResponseData>("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" + environment.fireBaseKey,
        {
            email: email,
            password: password,
            returnSecureToken: true
        })
        .pipe(catchError(this.handleError),
        tap(resData => {
           this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
        }));
    }

    autoLogin() {
        const userData : {
            email : string,
            UserId: string,
            _token: string,
            expireInDate: string
        } = JSON.parse(localStorage.getItem('userData'));
        if(!userData) {
            return;
        }
        const loadedUser = new User(
            userData.email,
            userData.UserId,
            userData._token,
            new Date(userData.expireInDate)
        );
        if(loadedUser.token) {
            const expirationDuration = new Date(userData.expireInDate).getTime() 
            - new Date().getTime();
           this.userSub.next(loadedUser);
           this.autoLogout(expirationDuration);
        }
    }

    logout() {
        this.userSub.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');
        if(this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer= null;
    }

    autoLogout(expirationDate: number) {
        this.tokenExpirationTimer =setTimeout(()=> {
            this.logout();
        }, expirationDate);
    }

    private handleAuthentication(email: string, userId: string, token: string, expireDate: number) {
        const expirationDate = new Date(new Date().getTime() + expireDate*1000);
        const user = new User(email, userId, token, expirationDate);
        this.userSub.next(user);
        this.autoLogout(expireDate*1000);
        localStorage.setItem('userData', JSON.stringify(user));
    }

    private handleError(errorRes: HttpErrorResponse) {
            let errorMsg = 'An error Occured!!';
            if(!errorRes.error || !errorRes.error.error) {
                return throwError(errorMsg);
            }
            switch(errorRes.error.error.message) {
                case 'EMAIL_EXISTS':
                    errorMsg = 'This email already exists';
                    break;
                case 'EMAIL_NOT_FOUND':
                    errorMsg = 'This email not exists';
                    break;
                case 'INVALID_PASSWORD':
                    errorMsg = 'Password is incorrect';
                    break;
                case 'USER_DISABLED':
                    errorMsg = 'user is disabled';
                    break;
                default:
                    errorMsg = 'An unknown error occured';
                    break;
            }
            return throwError(errorMsg);
        
    }
}

export interface AuthResponseData {
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string,
    registered?: string
}