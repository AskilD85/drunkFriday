import { Injectable, EventEmitter } from '@angular/core';
import { User } from './../model/User';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpService } from './../services/http.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'http://laravel5.master702.ru/api/';
  user: User;
  authEmit: EventEmitter<boolean> = new EventEmitter();
  serverError: EventEmitter<HttpErrorResponse> = new EventEmitter();
  registerUser: EventEmitter<User> = new EventEmitter();
  userEmit: EventEmitter<User> = new EventEmitter();
  regUser;

  constructor(private http: HttpClient,
              private route: Router,
              private httpService: HttpService) { }

  get token(): string {

    return localStorage.getItem('apikey');
  }


  authService(body: string, url: string, name?: string) {
    return this.http.post(this.url + url, body);
  }

  login(userlogin) {
    this.authService(userlogin, 'login').subscribe(data => {
      this.user = data as User;
      this.userEmit.emit(this.user);
      if (this.user.data !== null && this.user.data !== undefined) {
        // tslint:disable-next-line:no-string-literal
        localStorage.setItem('apikey', this.user.data['api_token']);
        localStorage.setItem('user_id', this.user.data.id);
        this.authEmit.emit(true);
        this.route.navigate(['/Admin/Lk']);
      }

    }, (err: HttpErrorResponse) => {
      this.serverError.emit(err);
      console.log(err);
    });
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  checkAuth() {
    if (this.isAuthenticated()) {
      const userId = localStorage.getItem('user_id');
      this.httpService.getUser(userId).subscribe(x => {
        console.log('Авторизовался: ', x);
        this.authEmit.emit(true);
      },
        (err: HttpErrorResponse) => {
          console.log('Не авторизовался: ', err);
          this.authEmit.emit(false);
        });

    } else {
      this.authEmit.emit(false);
    }
  }

  logout() {
    this.authEmit.emit(false);
    localStorage.clear();
    this.route.navigate(['Admin']);
  }

  register(regData) {
    this.http.post(this.url + 'register', regData, { observe: 'response' }).subscribe(data => {
      this.regUser = data;
      this.registerUser.emit(this.regUser);

    }, (err: HttpErrorResponse) => {
      this.serverError.emit(err);
    });
  }


}
