import { Injectable, EventEmitter } from '@angular/core';
import { User } from './../model/User';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
  })
export class AuthService {

    private url = 'http://laravel5.master702.ru/api/';
    user: User;
    authEmit: EventEmitter<boolean> = new EventEmitter();

    constructor(private http: HttpClient,
                private route: Router) {}

    get token(): string {
        // const expDate = new Date(localStorage.getItem('fb-token-exp'))
        // if (new Date() > expDate) {
        //     this.logout()
        //     return null
        // }
        return localStorage.getItem('apikey');
    }


    authService(body: string, url: string,  name?: string ) {
        console.log(333, JSON.stringify(body));
        return this.http.post(this.url + url, body);
      }

    login(userlogin) {
        this.authService(userlogin, 'login').subscribe(data => {
          console.log(data);
          this.user = data as User;

          if ( this.user.data !== null && this.user.data !== undefined) {
            // tslint:disable-next-line:no-string-literal
            localStorage.setItem('apikey', this.user.data['api_token'] );
            localStorage.setItem('user_id', this.user.data.id );
            this.authEmit.emit(true);
            this.route.navigate(['/']);
          }

        }, (err: HttpErrorResponse) => {

          console.log(err);
        });
    }

    isAuthenticated(): boolean {
      return !!this.token;
    }

    checkAuth() {
        if (this.isAuthenticated()) {
            this.authEmit.emit(true);
        } else {
            this.authEmit.emit(false);
        }
    }

    logout() {
        this.authEmit.emit(false);
        localStorage.clear();
    }


}
