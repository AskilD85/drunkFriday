import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/User';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent implements OnInit {

  constructor(private authService: AuthService) { }

  isAuth;

  ngOnInit() {
    this.authService.checkAuth();
    this.authService.authEmit.subscribe(auth => this.isAuth = auth);
  }

}
