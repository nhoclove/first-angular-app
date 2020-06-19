import { Component, ComponentFactoryResolver, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { AuthService, AuthResponseData } from './auth.service';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceHolderDirective } from '../shared/placeholder/placeholder.directive';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit, OnDestroy {
    isLoginMode = true;
    isLoading = false;
    error: string = null;
    @ViewChild(PlaceHolderDirective) alertHost: PlaceHolderDirective;

    private closeSub: Subscription;

    constructor(
        private authService: AuthService,
        private router: Router,
        private componentFactoryResolver: ComponentFactoryResolver,
        private store: Store<fromApp.AppState>
    ) {}

    ngOnInit() {
        this.store.select('auth').subscribe(authState => {
            this.isLoading = authState.loading;
            this.error = authState.authError;
            if (this.error) {
                this.showErrorAlert(this.error);
            }
        });
    }

    switchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form: NgForm) {
        if (!form.valid) {
            return;
        }

        const email = form.value.email;
        const password = form.value.password;
        this.isLoading = true;

        let authObs: Observable<AuthResponseData>;

        if (this.isLoginMode) {
            // authObs = this.authService.signin(email, password);
            this.store.dispatch(
                new AuthActions.LoginStart({ email: email, password: password })
            );
        } else {
            authObs = this.authService.signup(email, password);
        }

        // authObs.subscribe(
        //     (resData) => {
        //         console.log(resData);
        //         this.isLoading = false;
        //         this.router.navigate(['/recipes']);
        //     }, errorMessage => {
        //         console.log(errorMessage);
        //         this.error = errorMessage;
        //         this.showErrorAlert(this.error);
        //         this.isLoading = false;
        //     }
        // );

        form.reset();
    }

    onHandleError() {
        this.error = null;
    }

    showErrorAlert(message: string) {
        const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
        this.alertHost.viewContainerRef.clear();
        const componentRef = this.alertHost.viewContainerRef.createComponent(alertCmpFactory);

        componentRef.instance.message = message;
        this.closeSub = componentRef.instance.close.subscribe(() => {
            this.closeSub.unsubscribe();
            this.alertHost.viewContainerRef.clear();
        });
    }

    ngOnDestroy() {}
}
