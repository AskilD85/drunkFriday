import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { RECAPTCHA_SETTINGS, RecaptchaV3Module, RecaptchaFormsModule, RecaptchaSettings, RecaptchaModule } from 'ng-recaptcha';

@NgModule({
    declarations: [],
    imports: [
        HttpClientModule,
        RecaptchaModule,
    RecaptchaV3Module,
    RecaptchaFormsModule
    ],
    exports: [
        HttpClientModule,
        RecaptchaModule,
    RecaptchaV3Module,
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
