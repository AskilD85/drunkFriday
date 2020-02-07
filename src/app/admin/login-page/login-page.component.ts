import { environment } from './../../../environments/environment';
import { SharedService } from './../../services/shared.service';
import { AuthService } from './../auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { User, Data } from 'src/app/model/User';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],

})
export class LoginPageComponent implements OnInit, OnDestroy {

  reg = false;
  email = '';
  password = '';
  serverError;
  regUser: User;
  form = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required] ),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    recaptcha: new FormControl('', [Validators.required])
  });

  regForm = new FormGroup({
    name : new FormControl('', [Validators.minLength(3), Validators.required] ),
    email : new FormControl('', [Validators.email, Validators.required] ),
    password: new FormControl('', [Validators.required, Validators.minLength(8)] ),
    password_confirmation: new FormControl('', [Validators.required, Validators.minLength(8)] ),
    recaptcha: new FormControl('', [Validators.required])
  }, );

  sServerError: Subscription;
  sRegisterUser: Subscription;

  recaptchaSiteKey = environment.recaptchaSiteKey;

  constructor(private authService: AuthService, private sharedService: SharedService) { }

  ngOnInit() {
    this.sServerError = this.authService.serverError.subscribe(err => {this.serverError = err ; });
    this.sRegisterUser = this.authService.registerUser.subscribe(  (x: User)  => {
      this.regUser = x;
      this.reg = false;
      }) ;
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
    if (!this.regForm.invalid) {
      this.authService.register(this.regForm.value);
    }

 }
 resolved(event) {
  this.sharedService.resolved(event);
}
}
