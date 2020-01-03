import { Article } from './../../model/Article';
import { HttpService } from './../../services/http.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-uslugi',
  templateUrl: './uslugi.component.html',
  styleUrls: ['./uslugi.component.css']
})
export class UslugiComponent implements OnInit {

  articles: Article[];
  constructor(private http: HttpService) { }

  ngOnInit() {
    this.getUslugi();
  }

  
  getUslugi() {
    this.http.getArticles().subscribe((articles: Article[]) =>  this.articles = articles );
  }
}
