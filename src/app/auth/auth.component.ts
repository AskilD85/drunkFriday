import { User } from './../model/User';
import { HttpService } from './../services/http.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(private http: HttpService) { }
  view: string;
  name = '';
  password = '';
  email = '';
  users: User;
  ngOnInit() {
  }
  setView(view: string) {
    this.view = view;
  }

  Auth() {
    this.http.authService(this.email, this.password).subscribe((data: User) => this.users = data);
    console.log(this.users);
  }
}
