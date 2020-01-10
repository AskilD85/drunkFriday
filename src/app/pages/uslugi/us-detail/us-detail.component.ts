import { Subscription } from 'rxjs';
import { Article } from './../../../model/Article';
import { HttpService } from './../../../services/http.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-us-detail',
  templateUrl: './us-detail.component.html',
  styleUrls: ['./us-detail.component.css']
})
export class UsDetailComponent implements OnInit, OnDestroy {

  id ;
  usluga: Article;
  comments = '';

  sId: Subscription;
  constructor(private route: ActivatedRoute, private http: HttpService) { }

  ngOnInit() {
    this.sId = this.route.params.subscribe((params: Params) => {
      this.id = params.id;
      this.getArticle();
    });
  }

  ngOnDestroy() {
    if (this.sId) {
      this.sId.unsubscribe();
    }
  }

  getArticle() {
    this.http.getArticle(this.id).subscribe( (usluga: Article) => {this.usluga = usluga; });
  }
  getComments() {
    this.comments = 'Комментарий пока нет';
  }
}
