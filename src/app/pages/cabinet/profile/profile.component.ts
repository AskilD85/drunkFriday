import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpService } from 'src/app/services/http.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from 'src/app/model/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {

  constructor(private httpService: HttpService, private route: Router) { }
  userId = localStorage.getItem('user_id');
  user: User;
  success = false;
  addForm = new FormGroup({
    name: new FormControl(),
    ava: new FormControl(),
    desc: new FormControl(),
    phone: new FormControl(),
  });
  editSub: Subscription;

  ngOnInit() {
    this.httpService.getUser(Number(this.userId)).subscribe( (user: User) => { this.user = user; });
    if (localStorage.getItem('backUrl') !== null) {
      this.route.navigate([localStorage.getItem('backUrl')]);
      localStorage.removeItem('backUrl');
    }
  }

  ngOnDestroy() {
    if (this.editSub) {
      this.editSub.unsubscribe();
    }
  }

  editForm() {
    console.log(this.addForm.value);
    this.editSub = this.httpService.editUserInfo(this.addForm.value).subscribe((add: User) => {
      console.log(add);
      this.addForm.reset();
      this.success = true;
      console.log(add);
    },
      err => { console.log(err), console.log('here err-' + this.addForm.value); });
  }
}

