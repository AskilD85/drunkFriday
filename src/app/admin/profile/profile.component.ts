import { HttpService } from 'src/app/services/http.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private httpService: HttpService, private route: Router) { }
  userId = localStorage.getItem('user_id');
  backUrl = localStorage.getItem('backUrl');
  user: User;
  ngOnInit() {
    this.httpService.getUser(this.userId).subscribe( (user: User) => { this.user = user; });
    if (this.backUrl !== null) {
      this.route.navigate([this.backUrl]);
    }
  }

}
