import { RandomImg } from './../model/RandomImg';
import { HttpService } from './../services/http.service';
import { OnInit, Component } from '@angular/core';
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
  title = 'Тяпница!';
  nextAlko = 'Случайный собутыльник';
  ngOnInit() {
    this.getRandomImg();
  }

  getRandomImg() {

    this.httpService.getRandomImg().subscribe((data: RandomImg) => this.img = data);
    this.users = null;
    this.nextAlko = 'Случайный собутыльник';
  }

  getRandomUser() {
    this.httpService.getRandomUser().subscribe((data: User) => this.users = data);
    this.img = null;
    this.nextAlko = 'Следующий';

  }
  click() {
    console.log(111);
  }
  ReadyToDrink() {
      if (this.users.readytodrink === 1) {
        return 'Готов!';
      } else {
        return 'Не готов!';
      }


  }
}
