import { Subscription } from 'rxjs';
import { Article } from './../../../model/Article';
import { HttpService } from './../../../services/http.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-us-detail',
  templateUrl: './us-detail.component.html',
  styleUrls: ['./us-detail.component.css']
})
export class UsDetailComponent implements OnInit, OnDestroy {

  id = this.route.snapshot.params.id;
  usluga: Article;
  comments = '';

  sArticle: Subscription;
  constructor(private route: ActivatedRoute, private http: HttpService) { }

  ngOnInit() {
    this.sArticle = this.http.getArticle(this.id).subscribe( (usluga: Article) => {this.usluga = usluga; },
      (err: HttpErrorResponse) => {
        console.log('Ошибка деталки:  ', err);

      });
  }

  ngOnDestroy() {
    if (this.sArticle) {
      this.sArticle.unsubscribe();
    }
  }

  getComments() {
    this.comments = 'Комментарий пока нет';
  }
}
