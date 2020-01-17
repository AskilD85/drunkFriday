import { Injectable } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Injectable({
    providedIn: 'root'
  })

export class SharedService {
    constructor() {}

    clearFormAll(form: FormArray | FormGroup) {
        form.reset();
    }
}
