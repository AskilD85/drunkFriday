import { HttpService } from './services/http.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  constructor(private http: HttpService) { }

  today: string;
  auth: boolean;
  username: string;


  ngOnInit() {
    
    this.isTodayFriday();
    this.today = new Date().toLocaleString('ru', { weekday: 'long' }) + ', ' + new Date().toLocaleString('ru', {
      year: 'numeric', month: 'long', day: 'numeric'
    });
    this.http.authEmit.subscribe(x => { this.auth = x; });
    this.http.usernameEmit.subscribe(x  => { this.username = x; console.log(this.username); });
    this.checkAuth();
  }


  checkAuth() {
    this.http.checkAuth();
  }
  isTodayFriday() {
    const today = new Date();
    if (today.getDay() === 5) {
      return true;
    }
    return true;
  }

  logout() {
    this.http.logout();
  }
}


