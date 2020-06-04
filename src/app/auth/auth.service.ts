import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { AppSettings } from '../app-settings';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { error } from 'protractor';

interface AuthResponseData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
}

@Injectable({providedIn: 'root'})
export class AuthService {
    constructor(private http: HttpClient) {}

    signup(email: string, password: string) {
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + AppSettings.FIREBASE_KEY,
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        ).pipe(catchError(errorRes => {
            let errorMessage = 'An unknown error occurred!';
            if (!errorRes.error || !errorRes.error.error) {
                return throwError(errorMessage);
            }

            switch (errorRes.error.error.message) {
                case 'EMAIL_EXISTS':
                errorMessage = 'This email exists already';
            }

            return throwError(errorMessage);
        }));
    }
}
