import { Categories } from './../../model/Categories';
import { Article } from './../../model/Article';
import { HttpService } from './../../services/http.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-uslugi',
  templateUrl: './uslugi.component.html',
  styleUrls: ['./uslugi.component.css']
})
export class UslugiComponent implements OnInit, OnDestroy {

  articles: Article[];
  categories: Categories[];
  category: Categories[];

  sArticles: Subscription;
  sCategory: Subscription;

  constructor(public http: HttpService) { }

  ngOnInit() {
    this.sArticles = this.http.getArticles().subscribe((articles: Article[]) => {
      this.articles = articles;
      console.log(this.articles);
    },
      (err: HttpErrorResponse) => {
        console.log('Ошибка', err);

      } );

    this.sCategory = this.http.getCategories().subscribe( (categories: Categories[]) => {
      this.categories = categories;

    });

    this.http.getHero(2);
  }

  ngOnDestroy() {
    if (this.sArticles) {
      this.sArticles.unsubscribe();
    }
    if (this.sCategory) {
      this.sArticles.unsubscribe();
    }
  }



  getCatById(id: string) {
   // this.http.getCatregoryById(id).subscribe( (c: Categories[]) => {this.category = c; } );

    console.log(this.categories.filter( (c) => c.id === id ));
    return this.categories.filter( (c) => c.id === id );
  }
}
