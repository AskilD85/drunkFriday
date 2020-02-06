import { AuthService } from './../auth.service';
import { HttpService } from 'src/app/services/http.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from 'src/app/model/User';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {

  users: User[] = [];
  userId = localStorage.getItem('user_id');
  sUsers: Subscription;
  constructor(private httpService: HttpService, private authService: AuthService) { }

  ngOnInit() {
    this.sUsers = this.httpService.getUsers().subscribe( (users: User[]) => {
      this.users = users.filter( u => String(u.id) !== this.userId); },
      (err) => {console.log(err); this.authService.logout(); },
      () => {}
    );


  }
  ngOnDestroy() {
    if (this.sUsers) {
      this.sUsers.unsubscribe();
    }
  }
  destroy(id: string) {
    this.httpService.destroyUser(id).subscribe(
      () => {this.users = this.users.filter( u => u.id !== id ); }
    );
  }
}
