import { FormGroup } from '@angular/forms';
import { Categories } from './../model/Categories';
import { Article } from './../model/Article';
import { Router } from '@angular/router';
import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { UserComment } from '../model/UserComment';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient,
              private route: Router) { }
  // private url = 'http://laravel5.master702.ru/api/';
  private url = environment.BackendDBUrl;

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

  // tslint:disable-next-line: variable-name
  getArticles(city_id: number) {

    return this.http.get(this.url + `articles/${city_id}`);
  }

  getArticle(id) {
    return this.http.get(this.url + `articles/detail/${id}`).pipe(map((v:any)=>v.data));
  }

  getPostsOfUser(authorId) {
    return this.http.get(this.url + `articles/user/${authorId}`);
  }

  addPost(body) {
    body.user_id = localStorage.getItem('user_id');
    if (body.active == null) {
      body.active = false;
    }
    const endpoint = this.url;
    const headers = new HttpHeaders({});
    const formData: FormData = new FormData();
    formData.append('title', body.title);
    formData.append('body', body.body);
    formData.append('user_id', body.user_id);
    formData.append('active', body.active === true ? '1' : '0');
    formData.append('type', body.type);
    formData.append('city_id', body.city_id);
    formData.append('category_id', body.category_id);
    if (body.fileSource) {
      formData.append('image', body.fileSource, body.fileSource.name);
    }

    return this.http.post(this.url + 'articles', formData, {headers});


    // return this.http.post(this.url + `articles`, body);
  }

  editArticle1(body, id) {
    body.user_id = localStorage.getItem('user_id');
    if (body.active == null) {
      body.active = false;
    }
    const endpoint = this.url;
    const headers = new HttpHeaders({});
    const formData: FormData = new FormData();
    formData.append('title', body.title);
    formData.append('body', body.body);
    formData.append('user_id', body.user_id);
    formData.append('active', body.active === true ? '1' : '0');
    // formData.append('type', body.type);
    // formData.append('city_id', body.city_id);
    // formData.append('category_id', body.category_id);
    formData.append('_method', 'PUT');
    if (body.fileSource) {
      formData.append('image', body.fileSource, body.fileSource.name);
    }

    return this.http.post(this.url + `articles/${id}`, formData, { headers });
    // return this.http.put(this.url + `articles/${id}`, body);

    // return this.http.post(this.url + `articles`, body);
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
  delete(id: number) {
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

  getTypes() {
    return this.http.get(this.url + 'types');
  }

  getCatregoryById(id: string) {
    return this.http.get<Categories>(this.url + `categories/${id}`);
  }

  addCategories(body) {
    body.author_id = localStorage.getItem('user_id');
    return this.http.post(this.url + 'categories', body);
  }

  addTypes(body) {
    body.author_id = localStorage.getItem('user_id');
    return this.http.post(this.url + 'types', body);
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
  destroyComment(id: string) {
    return this.http.delete(this.url + `comments/${id}`);
  }

  destroyCategory(id: string) {
    return this.http.delete(this.url + `categories/${id}`);
  }

  destroyAppeal(id: string) {
    return this.http.delete(this.url + `appeals/${id}`);
  }

  verification(token: string) {
    console.log(this.url + `verify/${token}`);
    return this.http.get(this.url + `verify/${token}`);
  }

  reSendEmail(email: string) {
    const body = {
      email
    };
    return this.http.post(this.url + `forgetpass`, body);
  }
  sendVerifyEmail(email: string) {
    const body = {
      email
    };
    return this.http.post(this.url + `sendVerifyEmail`, body);
  }

  getPostTypes() {
    return this.http.get(this.url + `articlesType`);
  }

  getCities() {
    return this.http.get(this.url + `cities`);
  }

  // загрузка файла
  postFile(fileToUpload: File) {

    const headers = new HttpHeaders({});
    const formData: FormData = new FormData();
    formData.append('avatar', fileToUpload, fileToUpload.name);
    formData.append('id', localStorage.getItem('user_id'));
    // formData.append('user_id', localStorage.getItem('user_id'));
    return this.http
      .post(this.url + 'users', formData, {headers});
}

}
