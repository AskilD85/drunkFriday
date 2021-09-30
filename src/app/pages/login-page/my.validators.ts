import { AbstractControl, FormControl } from '@angular/forms';

export class MyValidators {
    static confirmPassword(control: AbstractControl): {[key: string]: boolean } {
        if (control.value !== '123456') {
            return {confirmPassword : true };
        }
        return null;
    }

}
