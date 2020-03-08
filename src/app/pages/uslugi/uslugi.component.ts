import { Categories } from './../../model/Categories';
import { Article } from './../../model/Article';
import { HttpService } from './../../services/http.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-uslugi',
  templateUrl: './uslugi.component.html',
  styleUrls: ['./uslugi.component.css']
})
export class UslugiComponent implements OnInit, OnDestroy {

  articles: Article[];
  articles2: Article[];
  articlesCount: number;
  categories: Categories[] = [];
  category: Categories[];
  position = localStorage.getItem('position') !== null ? localStorage.getItem('position') : 'usluga';
  sArticles: Subscription;

  constructor(public http: HttpService) { }

  ngOnInit() {
    this.sArticles = this.http.getArticles().subscribe((data: Article[]) => {
    this.articles = data;

      /*if (localStorage.getItem('position') !== null && localStorage.getItem('position') !== undefined) {
        this.selectionChange(localStorage.getItem('position'));
      }*/
    this.selectionChange(this.position);
    },
      (err: HttpErrorResponse) => {
        console.log('Ошибка', err);

      } );


  }

  ngOnDestroy() {
    if (this.sArticles) {
      this.sArticles.unsubscribe();
    }
  }
  selectionChange(val) {
    this.articles2 = this.articles.filter( art => art.type === val);
    localStorage.setItem('position', val);
  }
}
