import { Subscription } from 'rxjs';
import { Article } from './../../model/Article';
import { HttpService } from 'src/app/services/http.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/admin/auth.service';

@Component({
  selector: 'app-cabinet',
  templateUrl: './cabinet.component.html',
  styleUrls: ['./cabinet.component.css']
})
export class CabinetComponent implements OnInit, OnDestroy {

  constructor(private httpService: HttpService,
              private activateRoute: ActivatedRoute,
              private authService: AuthService,
              private route: Router) {

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

    this.authService.authEmit.subscribe(
      (data) => {
        console.log(55555555555);

          if (!data) {
            this.route.navigate(['login']);
          }
      }
    );

    this.page = this.activateRoute.snapshot.params.page;
    this.activePage(this.page)
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
