import { User } from './../model/User';
import { HttpService } from './../services/http.service';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(private http: HttpService, private route: Router) { }
  view = 'enter';
  name = '';
  password = '';
  password2 = '';
  email = '';
  user: User;
  username = '';
  apiToken = this.http.apitoken;
  errorText = this.http.errorText;
  auth = false;

  ngOnInit() {
  }

  setView(view: string) {
    this.view = view;
  }

  login() {
    this.http.login(this.email, this.password);
    /*
    this.http.authService(this.email, this.password).subscribe(data => {
      console.log(data);
      this.user = data as User;
      if ( this.user.data !== null && this.user.data !== undefined) {
        this.errorText = '';
        this.apiToken =  this.user.data['api_token'];
        this.username = this.user.data['name'];
        localStorage.setItem('apikey', this.apiToken );
        localStorage.setItem('username', this.username  );
        console.log(2, this.username );
        this.checkAuth();
      }



    }, (err: HttpErrorResponse) => {
      if (err.status === 422) {
        this.errorText = 'Не верный логин и/или пароль';
      }
      console.log(err);
    });*/
  }


  logout() {
    this.http.logout();
    /*
    localStorage.clear();
    this.auth = false;*/
  }

  register() {
    if (this.password !== this.password2) {
      this.errorText = 'Пароли не совпадают!';
    }


    this.http.register(this.name, this.email, this.password);
  }


}
