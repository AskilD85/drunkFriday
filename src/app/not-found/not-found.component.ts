import { Component, OnInit, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
