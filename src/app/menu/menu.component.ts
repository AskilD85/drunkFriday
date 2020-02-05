import { AuthService } from './../admin/auth.service';
import { HttpService } from './../services/http.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../model/User';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnDestroy {

  constructor(private http: HttpService, private authService: AuthService) { }

  token = this.http.apitoken;


  auth: boolean;
  user: User;
  userSub: Subscription;

  ngOnInit() {

    if (this.authService.isAuthenticated()) {
      this.authService.checkAuth();
      this.authService.authEmit.subscribe(x => {
        this.auth = x;
      });
      this.userSub = this.http.getUser(localStorage.getItem('user_id')).subscribe( (us: User) => {this.user = us; });
    }

  }

  ngOnDestroy(): void {
    if (this.userSub) {
      this.userSub.unsubscribe();
    }
  }

  click() {
    console.log(11);
  }

  logout() {
    this.authService.logout();
  }
}







