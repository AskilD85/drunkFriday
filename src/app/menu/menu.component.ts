import { AuthService } from './../admin/auth.service';
import { HttpService } from './../services/http.service';
import { Component, OnInit, OnDestroy, EventEmitter } from '@angular/core';
import { User } from '../model/User';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnDestroy {

  constructor(private http: HttpService,
              private authService: AuthService) { }

  token = this.http.apitoken;


  auth: boolean;
  user: User;
  userSub: Subscription;
  authSub: Subscription;
  isAdmin: boolean;
  isAuth: EventEmitter<any> = new EventEmitter();


  ngOnInit() {

      //  this.authService.checkAuth();
      this.authService.authEmit.subscribe(
        (data) =>  {this.isAuth = data; }
      );
      console.log(0, this.isAuth);
      this.authService.checktoken().subscribe(
        (data: boolean) => {
          this.auth = data;
          console.log(this.auth);

         },
        (err) => { console.log(err); }
      );

      this.isAdmin = this.authService.isAdmin();

      if (this.auth === true) {
          this.userSub = this.http.getUser(Number(localStorage.getItem('user_id'))).subscribe( (us: User) => { this.user = us; },
            (err) => { console.log(err); this.logout();  }
            );
        }
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
    this.authService.logout().subscribe(
      (data) => { console.log('logout', data );
      }
    );
    this.isAdmin = false;
  }
  changeTown() {
    console.log('change town');
  }
}







