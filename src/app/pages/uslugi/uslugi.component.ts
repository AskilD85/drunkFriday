import { Article } from './../../model/Article';
import { HttpService } from './../../services/http.service';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Categories } from './../../model/Categories';

@Component({
  selector: 'app-uslugi',
  templateUrl: './uslugi.component.html',
  styleUrls: ['./uslugi.component.css']
})
export class UslugiComponent implements OnInit {

  articles: Article[];
  constructor(private http: HttpService) { }
  category;
  ngOnInit() {
    this.getUslugi();
  }

  getUslugi() {
    this.http.getArticles().subscribe((articles: Article[]) => { 
      this.articles = articles; },
      (err: HttpErrorResponse) => {
        console.log('Ошибка', err);

      } );
   }


}
