import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Article } from './../../../model/Article';
import { HttpService } from './../../../services/http.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap } from 'rxjs/operators';
@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.css']
})
export class DetailPageComponent implements OnInit {

  articleId: string;
  editInfo;
  form: FormGroup;
  constructor(private route: ActivatedRoute,
              private http: HttpService
  ) { }

  ngOnInit() {
    this.route.params.pipe(switchMap( (params: Params) => {
      this.articleId = params.id;
      return this.http.getArticle(params.id); }
       )).subscribe((article: Article) => { this.form = new FormGroup({
         title: new FormControl(article.title, Validators.required),
         body: new FormControl(article.body, Validators.required),
         user_id: new FormControl(localStorage.getItem('user_id'), Validators.required),
       }); });

  }

  editArticleSubmit() {
    console.log(this.form.value);
    this.http.editArticle( this.form.value, this.articleId).subscribe(( edit: Article) => {
      this.editInfo = edit;
    },
      (err) => { console.log('что -то пошло нетак'); },
      );
  }

}
