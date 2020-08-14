import { User } from './../../model/User';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
    constructor(
        private http: HttpClient,
        private route: Router) {}

  // private url = 'http://laravel5.master702.ru/api/';
  private url = environment.BackendDBUrl;   

  getAppeals() {
    return this.http.get(this.url + 'appeals');
  }
  getUserById(id: string) {
    return this.http.get(this.url + `users/${id}`)
        .pipe(map( (user: User) => {
            return {
                name, id
            };
        }

        ));
  }

  getArticles() {
    return this.http.get(this.url + `admin/articles`);
  }
}
