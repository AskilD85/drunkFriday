import { UserComment } from '../../../model/UserComment';
import { AuthService } from './../../../admin/auth.service';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Article } from './../../../model/Article';
import { HttpService } from './../../../services/http.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { map, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { User } from 'src/app/model/User';




@Component({
  selector: 'app-us-detail',
  templateUrl: './us-detail.component.html',
  styleUrls: ['./us-detail.component.scss']
})
export class UsDetailComponent implements OnInit, OnDestroy {

  id = this.route.snapshot.params.id;
  usluga: Article;
  response: UserComment;
  myResponses: UserComment[] = [];

  sArticle: Subscription;
  sFormSubmit: Subscription;
  sMyResponses: Subscription;
  sDestroy: Subscription;
  disabled = false;
  users: User[];
  isAdmin = this.auth.isAdmin();
  userId = Number(localStorage.getItem('user_id'));
  detail: Article;
  deal = false;
  showSpinner = false;
  formDeal = new FormGroup({
    text: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Zа-яА-Я\d]{1,}.*$/)])
  });

  userid = localStorage.getItem('user_id');
  isAuth = this.auth.isAuthenticated();
  constructor(private route: ActivatedRoute, private http: HttpService, private auth: AuthService) { }

  ngOnInit() {
    this.getDetailArticle();
    this.getMyResponses();
  }

  ngOnDestroy() {
    if (this.sArticle) {
      this.sArticle.unsubscribe();
    }
    if (this.sMyResponses) {
      this.sMyResponses.unsubscribe();
    }
    if (this.sFormSubmit) {
      this.sFormSubmit.unsubscribe();
    }
    if (this.sDestroy) {
      this.sDestroy.unsubscribe();
    }
  }

  getDetailArticle() {
    this.showSpinner = true;
    this.sArticle = this.http.getDetailArticle(this.id)
      .subscribe(
        (detail: Article) => {
          this.detail = detail;
          this.showSpinner = false;

        }
      );
  }

  getMyResponses() {
    if (this.isAuth === true) {
      this.sMyResponses = this.http.getUserResponse(this.id).subscribe(
        (myResponses: UserComment[]) => {
          this.myResponses = myResponses;
        },
        (err) => {
          if (err.status === 401) {
            this.auth.logout();
          }
          console.log(err);
        }
      );
    }
  }


  toDeal() {
    if (!this.formDeal.invalid) {
      this.sFormSubmit = this.http.toDeal(this.formDeal, this.id).subscribe(
        (resp: UserComment) => {
          this.response = resp; setTimeout(() => { this.response = null; }, 3000); },
      (err) => { console.log(err); /*this.auth.logout();*/ },
        () => {
          this.sFormSubmit.unsubscribe();
          this.getMyResponses();
          this.deal = false;
        }
      );
      this.formDeal.reset();
    }

  }
  destroyComment(id: string) {
    this.sDestroy = this.http.destroyComment(id).subscribe(() => {
      this.myResponses = this.myResponses.filter(resp => resp.id !== id);
      this.getMyResponses();
    },
      (err) => { console.log(err); /*this.auth.logout();*/ }
    );
  }

  addBackUrl() {
    const route = this.route.snapshot.url;
    const backUrl = route[0].path + '/' + route[1].path;
    localStorage.setItem('backUrl', backUrl);
    console.log('back url: ', backUrl );
  }
}
