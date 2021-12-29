import { Subscription } from 'rxjs';
import { Article } from './../../model/Article';
import { HttpService } from 'src/app/services/http.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/admin/auth.service';

@Component({
  selector: 'app-cabinet',
  templateUrl: './cabinet.component.html',
  styleUrls: ['./cabinet.component.css']
})
export class CabinetComponent implements OnInit, OnDestroy {

  constructor(private httpService: HttpService,
              private activateRoute: ActivatedRoute,
              private authService: AuthService,
              private route: Router) {

               }
  add = false;
  userPage = false;
  messagePage = false;
  page = '';
  visibility = false;

  ngOnInit() {

    this.authService.authEmit.subscribe(
      (data) => {
          if (!data) {
            this.route.navigate(['login']);
          }
      }
    );

    this.page = this.activateRoute.snapshot.params.page;
    this.activePage(this.page)
  }
  ngOnDestroy() {
    
  }
  activePage(page) {
    this.page = page;
    
    
    this.visibility = true;
  }
  

  
}
