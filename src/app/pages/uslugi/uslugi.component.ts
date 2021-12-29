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
<<<<<<< Updated upstream
  position = localStorage.getItem('position') !== null ? localStorage.getItem('position') : '1';
=======
  position = localStorage.getItem('position') !== null ? localStorage.getItem('position') : 'master';
>>>>>>> Stashed changes
  location = '1';
  sArticles: Subscription;
  showSpinner = false;
  articleType: ArticleType[];
  constructor(public http: HttpService) {
  }

  ngOnInit() {
    this.dataload();
    this.getCities();
    this.getArticles(+this.location);

  }

  ngOnDestroy() {
    if (this.sArticles) {
      this.sArticles.unsubscribe();
    }
  }

  dataload() {
<<<<<<< Updated upstream
     this.http.getTypes().subscribe(
=======
     this.http.getPostTypes().subscribe(
>>>>>>> Stashed changes
       (data: ArticleType[] ) => {
         console.log(data);
         this.articleType = data;
       },
       (err) => { console.log(err);
       }
      );
  }

  // tslint:disable-next-line: variable-name
  getArticles(city_id: number) {
    this.showSpinner = true;
    this.articles = [];
    this.sArticles = this.http.getArticles(city_id).subscribe((data: Article[]) => {
      console.log(1, data);

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
    console.log(this.articles);

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
