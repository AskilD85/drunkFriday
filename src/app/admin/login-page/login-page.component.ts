import { environment } from './../../../environments/environment';
import { SharedService } from './../../services/shared.service';
import { AuthService } from './../auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { User, Data } from 'src/app/model/User';
import { HttpService } from 'src/app/services/http.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthData } from './../auth.service';

export interface ServerResponse {
  result: string;
  text: string;
}

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],

})

export class LoginPageComponent implements OnInit, OnDestroy {

  isRegForm = true; /** проверка активна ли форма регистрации */
  isLoginForm = true; /** проверка активна ли форма авторизации */
  email = '';
  password = '';
  serverError;
  regUser: User;
  page = 'login';
  title = 'Авторизация';
  text: string;
  isForgetPasswForm = true;
  emailNotFound: boolean;
  emailNotFoundText: string;
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

  forgetPasswForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    recaptcha: new FormControl('', [Validators.required])
  });

  sServerError: Subscription;
  sRegisterUser: Subscription;
  sAuth: Subscription;
  recaptchaSiteKey = environment.recaptchaSiteKey;

  constructor(
    private authService: AuthService,
    private sharedService: SharedService,
    private httpService: HttpService) { }

  ngOnInit() {
    this.sServerError = this.authService.serverError.subscribe(err => {this.serverError = err ; });
    this.sRegisterUser = this.authService.registerUser.subscribe(  (x: User)  => {
      this.regUser = x;
      this.isRegForm = false;
      }) ;

    this.sAuth = this.authService.authData.subscribe(
      (data: AuthData) => {
        console.log(data);
        
        this.text = data.text;
      }

    );
  }

  ngOnDestroy(): void {
    if (this.sServerError) {
      this.sServerError.unsubscribe();
    }
    if (this.sRegisterUser) {
      this.sRegisterUser.unsubscribe();
    }
    if (this.sAuth) {
      this.sAuth.unsubscribe();
    }
  }

/** завершить сеанс - кнопка выход
 *
 */
  logout() {
    this.authService.logout();
  }

  regClick() {

    this.page = 'reg';
    this.title = 'Регистрация';
  }

  authClick() {
    this.page = 'login';
    this.title = 'Авторизация';
  }

  login() {
    if (this.form.valid) {
      this.authService.login(this.form.value);
    }
  }

  forgetPassw() {
    this.page = 'forgetPassw';
    this.title = 'Восстановление пароля';
    this.forgetPasswForm.reset();

  }

  reSendEmail() {
    this.httpService.reSendEmail(this.forgetPasswForm.value.email).subscribe(
      (data: ServerResponse) => {
        console.log(data);

        if (data.result === 'OK') {
          this.text = data.text;
          this.isForgetPasswForm = false;
          setTimeout(() => { this.page = 'login'; this.text = null; }, 3000);
        }
        if (data.result === 'error') {
          this.forgetPasswForm.controls.email.setErrors({ emailNotFound: true });
          this.emailNotFoundText = data.text;
          console.log(this.forgetPasswForm.controls.email.errors.emailNotFound);

        }
       },
      err => { console.log(err); }
    );
  }

  regSubmit() {
    if (!this.regForm.invalid) {
      this.authService.register(this.regForm.value).subscribe( (data: ServerResponse) => {
        console.log(data);
        if (data.result === 'OK') {
          this.isRegForm = false;
          this.isForgetPasswForm = false;
          this.text = data.text;
          setTimeout(() => {
            this.text = null;
            this.page = 'login';
            this.forgetPasswForm.reset();
            this.form.reset();
          }, 3000);
        }
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      });
    }

 }
 resolved(event) {
  this.sharedService.resolved(event);
}
/**
 * Отправка письма для подтверждения email
 */
  sendVerifyEmail() {
    const email = this.form.value.email;
    this.httpService.sendVerifyEmail(email).subscribe(
      (data: ServerResponse) => {
        console.log(data);
        if (data.result === 'OK') {
          this.isLoginForm = false;
          this.text = null;
          setTimeout(() => {
            this.isLoginForm = true;
            this.form.reset();
          }, 3000 );
        }
      }
    );
  }
}
