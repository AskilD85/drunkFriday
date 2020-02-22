import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha';
import { TokenInterceptor } from '../_helpers/token.interceptor';
import { LoginPageComponent } from '../admin/login-page/login-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule, MatSlideToggleModule } from '@angular/material';

@NgModule({
    declarations: [LoginPageComponent],
    imports: [
        HttpClientModule,
        RecaptchaModule,
        RecaptchaFormsModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        MatCheckboxModule,
        MatSlideToggleModule
    ],
    exports: [
        HttpClientModule,
        RecaptchaModule,
        RecaptchaFormsModule,
        LoginPageComponent,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        MatCheckboxModule,
        MatSlideToggleModule
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    providers: [
      {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    ]
})

export class SharedModule {}
