import { FormGroup } from '@angular/forms';
import { Categories } from './../model/Categories';
import { Article } from './../model/Article';
import { Router } from '@angular/router';
import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from '../model/User';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UserComment } from '../model/UserComment';


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
  articleEmit: EventEmitter<Article> = new EventEmitter();
  article: Article;

  getRandomUser() {
    return this.http.get(this.url + 'randomuser');

  }
  getRandomImg() {
    return this.http.get(this.url + 'randomimg');

  }

  getArticles() {
    return this.http.get(this.url + 'articles');
  }

  getArticle(id) {
    return this.http.get(this.url + `articles/${id}`);

    /*
    this.http.get(this.url + `articles/${id}`).subscribe( (data: Article) => {
      this.articleEmit.emit(data);
    }
     );*/

    /*
    let arr = new Array<Article>();
    // return this.http.get(this.url + `articles/${id}`);

    this.http.get(this.url + `articles/${id}`).toPromise().then( data => {
      arr = data as Article[];
      this.articleEmit.emit(arr);
      console.log('article : ', arr);

    }

    );*/
  }

  getArticleOfUser(authorId) {
    return this.http.get(this.url + `category/${authorId}`);
  }

  addArticle(body) {
    body.user_id = localStorage.getItem('user_id');
    console.log(333, body);
    return this.http.post(this.url + `articles`, body);
  }

  editArticle(body, id) {
    if ( body.active === true) {
      body.active = 1;
    }
    if ( body.active === false) {
      body.active = 0;
    }
    return this.http.put(this.url + `articles/${id}`, body);
  }
  delete(id: string) {
    return this.http.delete(this.url + `articles/${id}`);
  }
  authService(email: string, password: string, url: string, name?: string) {
    const body = {
      email,
      password,
      name
    };
    console.log(333, JSON.stringify(body));
    return this.http.post(this.url + url, body);
  }

  checkAuth() {
    if (localStorage.getItem('apikey') !== null) {
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
      if (this.user.data !== null && this.user.data !== undefined) {
        this.errorText = '';
        localStorage.setItem('apikey', this.user.data.api_token);
        localStorage.setItem('username', this.user.data.name);
        this.checkAuth();
      }

    }, (err: HttpErrorResponse) => {
      console.log(err);
    });
  }


  logout() {
    localStorage.clear();
    this.auth = false;
    this.authEmit.emit(this.auth);
  }

  getUsers() {
    return this.http.get(this.url + 'users');
  }

  getUser(id: string) {
    return this.http.get(this.url + `users/${id}`);
  }
  destroyUser(id: string) {
    return this.http.delete(this.url + `users/${id}`);
  }

  getCategories() {
    return this.http.get(this.url + 'categories');
  }

  getCatregoryById(id: string) {
    return this.http.get<Categories>(this.url + `categories/${id}`);
  }

  addCategories(body) {
    body.author_id = localStorage.getItem('user_id');
    return this.http.post(this.url + 'categories', body);
  }

  addAppeal(body) {
    body.user_id = localStorage.getItem('user_id');
    return this.http.post(this.url + `appeals`, body);
  }

  getResponses(id: string) {
    return this.http.get(this.url + `response/${id}`);
  }

  getUserResponse(article: string) {
    const user = localStorage.getItem('user_id');
    return this.http.get<Array<UserComment>>(this.url + `response/${user}/${article}`);
  }

  toDeal(form: FormGroup, articlId: string  ) {
    const body = form.value;
    body.user_id = localStorage.getItem('user_id');
    body.article_id = articlId;
    console.log(body);
    return this.http.post(this.url + 'response', body);
  }
  destroyResponse(id: string) {
    return this.http.delete(this.url + `response/${id}`);
  }

  destroyCategory(id: string) {
    return this.http.delete(this.url + `categories/${id}`);
  }
}
