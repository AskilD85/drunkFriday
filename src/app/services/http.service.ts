import { Router } from '@angular/router';
import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from '../model/User';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient,
              private route: Router) { }
  private url = 'http://laravel5.master702.ru/api/';

  apitoken = '';
  username = '';
  errorText = '';
  auth = false;
  user;
  regUser;
  authEmit: EventEmitter<boolean> = new EventEmitter();
  usernameEmit: EventEmitter<string> = new EventEmitter();

  getRandomUser() {
    return this.http.get(this.url + 'randomuser');

  }
  getRandomImg() {
    return this.http.get(this.url + 'randomimg');

  }

  getArticles() {
    return this.http.get(this.url + 'articles');
  }

  addArticle(body) {
    return this.http.post(this.url + 'articles', body);
  }
  delete(id: string) {
    return this.http.delete(this.url + `articles/${id}`);
  }
  authService(email: string, password: string, url: string,  name?: string ) {
    const body = {
      email,
       password,
      name
    };
    console.log(333, JSON.stringify(body));
    return this.http.post(this.url + url, body);
  }

  checkAuth() {
    if (localStorage.getItem('apikey') !== null ) {
       this.auth = true;
       this.authEmit.emit(this.auth);
       this.username = localStorage.getItem('username');
       this.usernameEmit.emit(this.username);
       this.route.navigate(['/']);
    }

  }

  login(email, password) {
    this.authService(email, password, 'login').subscribe(data => {
      console.log(data);
      this.user = data as User;
      if ( this.user.data !== null && this.user.data !== undefined) {
        this.errorText = '';
        localStorage.setItem('apikey', this.user.data.api_token );
        localStorage.setItem('username', this.user.data.name );
        this.checkAuth();
      }



    }, (err: HttpErrorResponse) => {
      if (err.status === 422) {
        this.errorText = 'Не верный логин и/или пароль';
      }
      console.log(err);
    });
  }


  logout() {
    localStorage.clear();
    this.auth = false;
    this.authEmit.emit(this.auth);
  }

  register(name: string, email: string, pass: string) {
    const regData = {
      // tslint:disable-next-line:object-literal-key-quotes
      'name' : name,
      // tslint:disable-next-line:object-literal-key-quotes
      'email': email,
      // tslint:disable-next-line:object-literal-key-quotes
      'password' : pass,
      // tslint:disable-next-line:object-literal-key-quotes
      'password_confirmation': pass

    };
    this.http.post(this.url + 'register', regData, {observe: 'response'}).subscribe(data => {
      this.regUser = data;
      console.log('статус: ', this.regUser.status);
      console.log(data.status);
      if (this.regUser.status === 201) {
        this.errorText = 'Зареган!';
      }

    }, (err: HttpErrorResponse) => {
      if (err.status === 422) {
        this.errorText = 'Не верный логин и/или пароль';
      }
      console.log(err);
      console.log(err.status);
    });
  }

}
