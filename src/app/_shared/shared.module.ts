import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { RECAPTCHA_SETTINGS,  RecaptchaFormsModule, RecaptchaSettings, RecaptchaModule } from 'ng-recaptcha';
import { TokenInterceptor } from '../_helpers/token.interceptor';

@NgModule({
    declarations: [],
    imports: [
        HttpClientModule,
        RecaptchaModule,
    RecaptchaFormsModule
    ],
    exports: [
        HttpClientModule,
        RecaptchaModule,
        RecaptchaFormsModule
    ]
    ,
    providers: [ {
        provide: RECAPTCHA_SETTINGS,
        useValue: {
          siteKey: '6Lf2oacUAAAAAHDGk5rddlzxHBDQ2rhHk17fkguV',
        } as RecaptchaSettings,
      },
      {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    ]
})

export class SharedModule {}
