import { Categories } from './../../model/Categories';
import { Article } from './../../model/Article';
import { HttpService } from './../../services/http.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription, Observable } from 'rxjs';
import { City } from 'src/app/model/City';

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
  position = localStorage.getItem('position') !== null ? localStorage.getItem('position') : 'usluga';
  location = '1';
  sArticles: Subscription;
  showSpinner = false;
  constructor(public http: HttpService) {
  }

  ngOnInit() {
    this.location = localStorage.getItem('location') || '2';
    console.log(0, this.location);
    this.getCities();
    this.getArticles(+this.location);

  }

  ngOnDestroy() {
    if (this.sArticles) {
      this.sArticles.unsubscribe();
    }
  }

  // tslint:disable-next-line: variable-name
  getArticles(city_id: number) {
    this.showSpinner = true;
    this.articles = [];
    this.sArticles = this.http.getArticles(city_id).subscribe((data: Article[]) => {
      this.articles = data;
      this.showSpinner = false;
      this.selectionChange('needjob');
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
  selectionChange(val) {
    this.articles2 = this.articles.filter( art => art.type === val);
    localStorage.setItem('position', val);
  }

  selectionChangeCity(val: string) {
    localStorage.setItem('location', val);
    localStorage.setItem('position', 'needjob');
    this.position = localStorage.getItem('position');
    this.location = localStorage.getItem('location');
    this.getArticles(+this.location);
  }
}
