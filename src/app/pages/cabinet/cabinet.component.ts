import { Subscription } from 'rxjs';
import { Article } from './../../model/Article';
import { HttpService } from 'src/app/services/http.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cabinet',
  templateUrl: './cabinet.component.html',
  styleUrls: ['./cabinet.component.css']
})
export class CabinetComponent implements OnInit, OnDestroy {

  constructor(private httpService: HttpService,
              private activateRoute: ActivatedRoute) {

               }
  add = false;
  userPage = false;
  messagePage = false;
  page = '';
  visibility = false;
  sArticles: Subscription;
  sDeleteArticle: Subscription;
  articles: Article[];
  ngOnInit() {
    this.page = this.activateRoute.snapshot.params.page;
    this.myUslugi();
  }
  ngOnDestroy() {
    if (this.sArticles) {
      this.sArticles.unsubscribe();
    }
    if (this.sDeleteArticle) {
      this.sDeleteArticle.unsubscribe();
    }
  }
  activePage(page) {
    this.page = page;
    this.visibility = true;
  }
  myUslugi() {
    const userid = localStorage.getItem('user_id');
    this.sArticles = this.httpService.getArticleOfUser(userid).subscribe(
      ( articles: Article[]) => {
        console.log(11, articles) ;
        this.articles = articles; }
    );
  }

  reload() {
    this.myUslugi();
  }
  delete(id: number) {
    this.sDeleteArticle = this.httpService.delete(id).subscribe(() => {
      this.articles = this.articles.filter( articles => articles.id !== id);
    });
  }
}
