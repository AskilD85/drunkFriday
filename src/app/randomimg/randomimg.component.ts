import { RandomImg } from './../model/RandomImg';
import { HttpService } from './../services/http.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../model/User';

@Component({
  selector: 'app-randomimg',
  templateUrl: './randomimg.component.html',
  styleUrls: ['./randomimg.component.css']
})
export class RandomimgComponent implements OnInit {

  constructor(private httpService: HttpService) { }

  img: RandomImg;
  users: User;
  ngOnInit() {
    this.getRandomImg();
  }

  getRandomImg() {

    this.httpService.getRandomImg().subscribe((data: RandomImg) => this.img = data);
    this.users = null;
  }

  getRandomUser() {
    this.httpService.getRandomUser().subscribe((data: User) => this.users = data);
    this.img = null;
  }
  click() {
    console.log(111);
  }
}
