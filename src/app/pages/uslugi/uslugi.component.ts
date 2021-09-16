import { Categories } from './../../model/Categories';
import { Article } from './../../model/Article';
import { HttpService } from './../../services/http.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription, Observable } from 'rxjs';
import { City } from 'src/app/model/City';
import { ArticleType } from 'src/app/model/ArticleTypes';

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
  cities: City[];
  position = localStorage.getItem('position') !== null ? localStorage.getItem('position') : 'master';
  location = '1';
  sArticles: Subscription;
  showSpinner = false;
  articleType : ArticleType[];
  constructor(public http: HttpService) {
  }

  ngOnInit() {
    this.dataload();
    this.location = localStorage.getItem('location') || '2';
    this.getCities();
    this.getArticles(+this.location);


  }

  ngOnDestroy() {
    if (this.sArticles) {
      this.sArticles.unsubscribe();
    }
  }

  dataload() {
     this.http.getArticlesType().subscribe(
       (data: ArticleType[] ) => {
          this.articleType = data;
          
       },
       (err) => {

       }
      )
  }

  // tslint:disable-next-line: variable-name
  getArticles(city_id: number) {
    this.showSpinner = true;
    this.articles = [];
    this.sArticles = this.http.getArticles(city_id).subscribe((data: Article[]) => {
      this.articles = data;
      this.showSpinner = false;
      this.selectionChange(this.position);
    },
      (err: HttpErrorResponse) => {
        console.log('Ошибка', err);

      });
  }
  getCities() {
    this.http.getCities().subscribe(
      (data: City[]) => {
        this.cities = data;
        // console.log(this.cities);
      }
    );
  }
  selectionChange(val: string) {
    this.articles2 = this.articles.filter( art => art.type === val);
    localStorage.setItem('position', val);
  }

  selectionChangeCity(val: string) {
    localStorage.setItem('location', val);
    localStorage.setItem('position', 'job');
    this.position = localStorage.getItem('position');
    this.location = localStorage.getItem('location');
    this.getArticles(+this.location);
  }
}
