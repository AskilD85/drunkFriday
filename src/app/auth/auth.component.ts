import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor() { }
  view: string;
  name = '';
  password = '';
  email = '';
  ngOnInit() {
  }
  setView(view: string) {
    this.view = view;
  }

  Auth() {
    console.log(this.email, this.password);
  }
}
