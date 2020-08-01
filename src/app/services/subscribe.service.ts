import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from './../model/User';

@Injectable({
  providedIn: 'root'
})
export class SubscribeService {

  private url = environment.BackendDBUrl;
  constructor(private http: HttpClient) { }

  getSubscribes(userId: number | string) {
    console.log(userId);
    return this.http.get(this.url + `subscribes/${userId}`);
  }
}
