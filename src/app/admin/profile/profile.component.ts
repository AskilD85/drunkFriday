import { HttpService } from 'src/app/services/http.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/User';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private httpService: HttpService) { }
  userId = localStorage.getItem('user_id');
  user: User;
  ngOnInit() {
    this.httpService.getUser(this.userId).subscribe( (user: User) => { this.user = user; });
  }

}
