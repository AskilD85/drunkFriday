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
  styleUrls: ['./us-detail.component.css']
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

  detail: Article;

  deal = false;
  formDeal = new FormGroup({
    text: new FormControl('', [Validators.required, Validators.pattern(/^[а-яА-Я\d]{1,}.*$/)])
  });

  isAuth = this.auth.isAuthenticated();
  constructor(private route: ActivatedRoute, private http: HttpService, private auth: AuthService) { }

  ngOnInit() {  
    console.log(this.isAuth);
    this.sArticle = this.http.getDetailArticle(this.id)
      .subscribe(
        (detail: Article) => { this.detail = detail; }
      );
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

  getMyResponses() {
    if (this.isAuth) {
      this.sMyResponses = this.http.getUserResponse(this.id).subscribe(
        (myResponses: UserComment[]) => { this.myResponses = myResponses; },
        (err) => {
          console.log(err);
          // this.auth.logout();
        }
      );
    }
  }
  getComments() {
    return this.response;
  }

  toDeal() {
    if (!this.formDeal.invalid) {
      this.sFormSubmit = this.http.toDeal(this.formDeal, this.id).subscribe(
        (resp: UserComment) => { this.response = resp; setTimeout(() => { this.response = null; }, 3000); },
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

}
