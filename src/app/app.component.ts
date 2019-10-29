import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  constructor() { }
  ngOnInit() {
    this.isTodayFriday();
  }


  isTodayFriday() {
    const today = new Date();
    if (today.getDay() === 5) {
      return true;
    }
    return true;
  }


}


