import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, BehaviorSubject } from 'rxjs';

import { AppSettings } from '../app-settings';
import { catchError, tap } from 'rxjs/operators';
import { User } from './user.model';

export interface AuthResponseData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
}

@Injectable({providedIn: 'root'})
export class AuthService {

    user = new BehaviorSubject<User>(null);

    constructor(private http: HttpClient) {}

    signup(email: string, password: string) {
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + AppSettings.FIREBASE_KEY,
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        ).pipe(catchError(this.handleError), tap(resData => {
            this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
        }));
    }

    signin(email: string, password: string) {
        return this.http
        .post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + AppSettings.FIREBASE_KEY,
        {
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(catchError(this.handleError), tap(resData => {
            this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
        }));
    }

    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = 'An unknown error occurred!';
        if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage);
        }

        switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage = 'This email exists already';
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage = 'This email does not exist';
                break;
            case 'INVALID_PASSWORD':
                errorMessage = 'Password is not correct';
        }

        return throwError(errorMessage);
    }

    private handleAuthentication(email: string, id: string, token: string, expiresIn: number) {
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(email, id, token, expirationDate);
        this.user.next(user);
    }
}
