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
  }

  getArticleOfUser(authorId) {
    return this.http.get(this.url + `category/${authorId}`);
  }

  addArticle(body) {
    body.user_id = localStorage.getItem('user_id');
    if (body.active == null) {
      body.active = false;
    }
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

  getUsers() {
    return this.http.get(this.url + 'users');
  }

  getUser(id: number) {
    return this.http.get(this.url + `users/${id}`);
  }
  destroyUser(id: number) {
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
    return this.http.get(this.url + `comments/${id}`);
  }

  getUserResponse(article: string) {
    const user = localStorage.getItem('user_id');
    return this.http.get<Array<UserComment>>(this.url + `comments/${article}/${user}`);
  }

  toDeal(form: FormGroup, articlId: string  ) {
    const body = form.value;
    body.user_id = localStorage.getItem('user_id');
    body.article_id = articlId;
    return this.http.post(this.url + 'comments', body);
  }
  destroyResponse(id: string) {
    return this.http.delete(this.url + `comments/${id}`);
  }

  destroyCategory(id: string) {
    return this.http.delete(this.url + `categories/${id}`);
  }

  destroyAppeal(id: string) {
    return this.http.delete(this.url + `appeals/${id}`);
  }
  getDetailArticle(id: number) {
    return this.http.get(this.url + `articles/detail/${id}`);
  }
}
