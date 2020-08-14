import { Categories } from './../../model/Categories';
import { Article } from './../../model/Article';
import { HttpService } from './../../services/http.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-uslugi',
  templateUrl: './uslugi.component.html',
  styleUrls: ['./uslugi.component.scss']
})
export class UslugiComponent implements OnInit, OnDestroy {

  articles: Article[];
  articles2: Article[];
  articlesCount: number;
  categories: Categories[] = [];
  category: Categories[];
  position = localStorage.getItem('position') !== null ? localStorage.getItem('position') : 'usluga';
  sArticles: Subscription;
  showSpinner = false;
  constructor(public http: HttpService) { }

  ngOnInit() {
    this.getArticles();
  }

  ngOnDestroy() {
    if (this.sArticles) {
      this.sArticles.unsubscribe();
    }
  }

  getArticles() {
    this.showSpinner = true;
    this.sArticles = this.http.getArticles().subscribe((data: Article[]) => {
      this.articles = data;
      this.showSpinner = false;
      this.selectionChange(this.position);
    },
      (err: HttpErrorResponse) => {
        console.log('Ошибка', err);

      });
  }

  selectionChange(val) {
    this.articles2 = this.articles.filter( art => art.type === val);
    localStorage.setItem('position', val);
  }
}
