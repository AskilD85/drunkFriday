import { Injectable } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })



export class SharedService {
    constructor() {}
  sub$ = new BehaviorSubject(0);
    clearFormAll(form: FormArray | FormGroup) {
        form.reset();
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }
}
