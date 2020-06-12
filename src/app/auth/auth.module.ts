import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AuthComponent } from './auth.component';
import { LoadingSpinnerComponent } from '../shared/loading-spinner/loading-spinner.component';

const routes: Routes = [
    { path: 'auth', component: AuthComponent},
];

@NgModule({
    declarations: [
        AuthComponent,
        LoadingSpinnerComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes),
    ],
    exports: [],
})
export class AuthModule {

}