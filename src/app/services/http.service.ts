import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }
  private url = 'http://laravel5.master702.ru/api/';



  getRandomUser() {
    return this.http.get(this.url + 'randomuser');

  }
  getRandomImg() {
    return this.http.get(this.url + 'randomimg');

  }

  authService(email: string, password: string) {
    const body = {
      'email': email,
      'password': password

    };

    console.log(JSON.stringify(body));
    return this.http.post(this.url + 'login', body);
  }

  

}
