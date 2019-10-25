import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor() { }



  // selected elements
  navTrigger = document.getElementById('nav-trigger');
  nav = document.getElementById('nav');
  header = document.getElementById('header');
  heading = document.getElementById('heading');
  labels = document.getElementsByClassName('nav-label');
  test = document.getElementById('test');
  // sizing
  windowHeight = window.innerHeight;
  windowWidth = window.innerWidth;

  fontSize = this.windowHeight * 0.1;
  headingSize = this.windowWidth * 0.1;
  today: string;
  ngOnInit() {
    this.today = new Date().toLocaleString('ru', { weekday: 'long' }) + ', ' + new Date().toLocaleString('ru', {
      year: 'numeric', month: 'long', day: 'numeric'
    });
  }

  click() {
    console.log(11);
  }


  navToggle() {

    const closed = (document.getElementById('nav-trigger').className.indexOf('close') > 0);

    if (closed) {

      document.getElementById('nav-trigger').className = 'nav-trigger open';
      document.getElementById('nav').className = 'out';
    } else {
      document.getElementById('nav-trigger').className = 'nav-trigger close';
      document.getElementById('nav').className = 'in';
    }
  }





}

