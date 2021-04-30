import { User } from './../model/User';
import { HttpService } from './../services/http.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alkousers',
  templateUrl: './alkousers.component.html',
  styleUrls: ['./alkousers.component.css']
})
export class AlkousersComponent implements OnInit {

  constructor(private httpservice: HttpService) { }
  users: User;
  ngOnInit() {
  }

}
