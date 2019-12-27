import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  reg = false;
  email = '';
  password = '';

  // form: FormGroup;
  form = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required] ),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });
  constructor(private authService: AuthService) { }

  ngOnInit() {
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
}
