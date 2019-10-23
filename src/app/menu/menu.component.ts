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

  ngOnInit() {
  }

  click() {
    console.log(11);
  }

/*
resize() {
  this.windowHeight = window.innerHeight;
  this.windowWidth = window.innerWidth;
  this.fontSize = this.windowHeight * 0.1;
  this.headingSize = this.windowWidth * 0.1;
  if (this.headingSize > this.windowHeight * 0.3) { this.headingSize = this.windowHeight * 0.3; }

  for (let i = 0; i < (this.labels).length; i++) {
    this.labels[i].style.fontSize = this.fontSize + 'px';
    this.labels[i].style.height = this.fontSize + 'px';
    this.labels[i].style.marginTop = '-' + this.fontSize * 0.6 + 'px';
  }

  this.header.style.height = this.windowHeight + 'px';
  this.heading.style.fontSize = this.headingSize + 'px';
  this.heading.style.height = this.headingSize + 'px';
  this.heading.style.marginTop = '-' + this.headingSize * 0.6 + 'px';

}*/

navToggle() {

  const closed = (document.getElementById('nav-trigger').className.indexOf('close') > 0);

  if (closed) {
    console.log(1)
    document.getElementById('nav-trigger').className = 'nav-trigger open';
    document.getElementById('nav').className = 'out';
  } else {
    console.log(2)
    document.getElementById('nav-trigger').className = 'nav-trigger close';
    document.getElementById('nav').className = 'in';
  }
}





}

