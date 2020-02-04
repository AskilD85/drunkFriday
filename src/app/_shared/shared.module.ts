import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { RECAPTCHA_SETTINGS,  RecaptchaFormsModule, RecaptchaSettings, RecaptchaModule } from 'ng-recaptcha';

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
      }]
})

export class SharedModule {}
