import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { AnimationPlayer } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class BlogAdminService {

  constructor(private http: HttpClient) { }
  private url = environment.BackendDBUrl;

  getArticlesForUser(userId: string) {
    return this.http.get(this.url + `show_for_user/${userId}`);
  }

  getAllArticles() {
    return this.http.get(this.url + `blog`);
  }

  addArticle(body: any) {
    body.user_id = localStorage.getItem('user_id');
    if (body.active == null) {
      body.active = false;
    }
    return this.http.post(this.url + `blog`, body);
  }
}
