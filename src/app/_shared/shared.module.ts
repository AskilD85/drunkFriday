import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { TokenInterceptor } from '../_helpers/token.interceptor';
import { LoginPageComponent } from '../pages/login-page/login-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule, MatSlideToggleModule } from '@angular/material';
import { ProfileComponent } from '../pages/cabinet/profile/profile.component';
import { ResetPasswComponent } from '../pages/reset-passw/reset-passw.component';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [LoginPageComponent, ProfileComponent, ResetPasswComponent],
    imports: [
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        MatCheckboxModule,
        RouterModule,
    ],
    exports: [
        HttpClientModule,
        LoginPageComponent,
        ProfileComponent,
        ResetPasswComponent,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        MatCheckboxModule,
        RouterModule,
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    providers: [
      {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    ]
})

export class SharedModule {}
