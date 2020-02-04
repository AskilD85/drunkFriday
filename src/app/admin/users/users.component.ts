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
  sUsers: Subscription;
  constructor(private httpService: HttpService) { }

  ngOnInit() {
    this.sUsers = this.httpService.getUsers().subscribe( (users: User[]) => {this.users = users; });
  }
  ngOnDestroy() {
    if (this.sUsers) {
      this.sUsers.unsubscribe();
    }
  }
}
