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
  authSub: Subscription;
  isAdmin: boolean;


  ngOnInit() {
      this.authService.checkAuth();
      this.authSub = this.authService.authEmit.subscribe(x => {
        this.auth = x;
        this.isAdmin = this.authService.isAdmin();
        if (this.auth === true) {
          this.userSub = this.http.getUser(Number(localStorage.getItem('user_id'))).subscribe( (us: User) => { this.user = us; },
          (err) => { console.log(err); this.authService.logout(); }
            );
        }
      });
  }

  ngOnDestroy(): void {
    if (this.userSub) {
      this.userSub.unsubscribe();
    }
    if (this.authSub) {
      this.authSub.unsubscribe();
    }
  }

  click() {
    console.log(11);
  }

  logout() {
    this.authService.logout();
    this.isAdmin = false;
  }
  changeTown() {
    console.log('change town');
  }
}







