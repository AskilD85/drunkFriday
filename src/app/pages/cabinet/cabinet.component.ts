import { Observable } from 'rxjs';
import { HttpService } from './../../services/http.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cabinet',
  templateUrl: './cabinet.component.html',
  styleUrls: ['./cabinet.component.css']
})
export class CabinetComponent implements OnInit {

  constructor(private http: HttpService) { }
  user;
  ngOnInit() {
    this.http.userInfoEmit.subscribe(data => {this.user = data; });
    this.getUSerInfo();
  }
  getUSerInfo() {
    this.http.getUserInfo();
  }
}
