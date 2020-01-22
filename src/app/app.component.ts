import { Subscription, Observable } from 'rxjs';
import { AuthService } from './admin/auth.service';
import { HttpService } from './services/http.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from './model/User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, OnDestroy {


  constructor(private http: HttpService, private authService: AuthService) { }

  today: string;
  auth: boolean;
  username: string;
  user: User;

  userSub: Subscription;

  ngOnInit() {

    this.isTodayFriday();
    this.today = new Date().toLocaleString('ru', { weekday: 'long' }) + ', ' + new Date().toLocaleString('ru', {
      year: 'numeric', month: 'long', day: 'numeric'
    });
    this.authService.checkAuth();
    this.authService.authEmit.subscribe(x => {
      this.auth = x;
      this.userSub = this.http.getUser(localStorage.getItem('user_id')).subscribe( (us: User) => {this.user = us; });
    });

  }

  ngOnDestroy(): void {
    if (this.userSub) {
      this.userSub.unsubscribe();
    }
  }


  isTodayFriday() {
    const today = new Date();
    if (today.getDay() === 5) {
      return true;
    }
    return true;
  }

  logout() {
    this.authService.logout();
  }
}


