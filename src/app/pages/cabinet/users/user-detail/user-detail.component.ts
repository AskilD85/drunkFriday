import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { Router, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/model/User';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  constructor(private httpService: HttpService, private activatedRoute: ActivatedRoute) { }

  userid = this.activatedRoute.snapshot.params.id;
  user: User;
  visible = true;
  ngOnInit() {
    this.httpService.getUser(this.userid).subscribe(
      (user: User) => { this.user = user; }
    );
  }
  writeToMaster() {
    console.log('writeToMaster');
  }
}
