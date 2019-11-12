import { User } from './../model/User';
import { HttpService } from './../services/http.service';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import {Router} from '@angular/router';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(private http: HttpService, private route: Router) { }
  view: string;
  name = '';
  password = '';
  email = '';
  users: User;
  apiToken = '';
  ngOnInit() {
  }
  setView(view: string) {
    this.view = view;
  }

  Auth() {
    this.http.authService(this.email, this.password).subscribe((data: Response) => {

      if (data) {
        console.log(2, data.data.api_token);
        this.apiToken = data.data.api_token;
        this.route.navigate(['/alkouser']);
      }

      }, (err: HttpErrorResponse) => {
        console.log(err);
      });
  }


}
