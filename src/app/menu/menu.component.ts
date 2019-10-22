import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor() { }



  // selected elements
  const navTrigger = document.getElementById('nav-trigger');
  const nav = document.getElementById('nav');
  const header = document.getElementById('header');
  const heading = document.getElementById('heading');
  const labels = document.getElementsByClassName('nav-label');

  // sizing
  const windowHeight = window.innerHeight;
  const windowWidth = window.innerWidth;
  const fontSize = this.windowHeight * 0.1;
  const headingSize = this.windowWidth * 0.1;

  ngOnInit() {

  }

  click() {
    console.log(11)
  }


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

}

navToggle(e) {
  const closed = (this.navTrigger.className.indexOf('close') > 0);
  if (closed) {
    this.navTrigger.className = 'nav-trigger open';
    this.nav.className = 'out';
  } else {
    this.navTrigger.className = 'nav-trigger close';
    this.nav.className = 'in';
  }
}





}

