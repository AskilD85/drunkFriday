import { MyValidators } from './my.validators';
import { AuthService } from './../auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { User } from 'src/app/model/User';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit, OnDestroy {
  

  reg = false;
  email = '';
  password = '';
  serverError;
  regUser: User;
  form = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required] ),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  regForm = new FormGroup({
    name : new FormControl('', [Validators.minLength(3), Validators.required] ),
    email : new FormControl('', [Validators.email, Validators.required] ),
    password: new FormControl('', [Validators.required, Validators.minLength(8)] ),
    password_confirmation: new FormControl('', [Validators.required, Validators.minLength(8)] ),
  }, );

  sServerError: Subscription;
  sRegisterUser: Subscription;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.sServerError = this.authService.serverError.subscribe(err => {this.serverError = err ; });
    this.sRegisterUser = this.authService.registerUser.subscribe(x => {this.regUser = x; });
  }
  ngOnDestroy(): void {
    if (this.sServerError) {
      this.sServerError.unsubscribe();
    }
    if (this.sRegisterUser) {
      this.sRegisterUser.unsubscribe();
    }
  }


  logout() {
    this.authService.logout();
  }

  regClick() {
    this.reg = true;
  }

  authClick() {
    this.reg = false;
  }
  login() {
    if (this.form.valid) {
      this.authService.login(this.form.value);
    }
  }

  regSubmit() {
    console.log('регистрируюсь') ;
    this.authService.register(this.regForm.value);
 }
}
