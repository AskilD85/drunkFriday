import { Subscription } from 'rxjs';
import { Article } from './../../model/Article';
import { Categories } from './../../model/Categories';
import { AuthService } from './../auth.service';
import { HttpService } from './../../services/http.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from 'src/app/model/User';

@Component({
  selector: 'app-lk',
  templateUrl: './lk.component.html',
  styleUrls: ['./lk.component.css']
})
export class LkComponent implements OnInit, OnDestroy {



  title = '';
  body = '';
 

  user: User;

  getUserSub: Subscription;
 
  constructor(private http: HttpService, private authService: AuthService) { }

  ngOnInit() {

  }

  ngOnDestroy() {

  }


  getUsers() {
    this.getUserSub = this.http.getUsers().subscribe((user: User) => { this.user = user; console.log(user); });
  }

  getUser() {
    const userid = localStorage.getItem('user_id');
    this.http.getUser(userid).subscribe((user: User) => { this.user = user; console.log(user); });
  }


  /*reverse2(str: string) {
    const result = str.split('').reverse().join('');
    console.log('reverse:   ', result );

    function Counter() {
      let i = 1;
      return ( function() {
        return (i++);
      });
    }
    const c = Counter();
    console.log( c());
    console.log( c());
    console.log( c());
  }*/
 

}

