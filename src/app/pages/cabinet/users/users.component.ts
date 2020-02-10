import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/User';
import { Subscription } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor( private httpServices: HttpService) { }
  users: User[];
  sUsers: Subscription;

  ngOnInit() {
    this.sUsers = this.httpServices.getUsers().subscribe(
      ( user: User[]) => { this.users = user; }
    );
  }

}
