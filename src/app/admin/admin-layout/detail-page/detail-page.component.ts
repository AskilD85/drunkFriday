import { Categories } from './../../../model/Categories';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Article } from '../../../model/Article';
import { HttpService } from '../../../services/http.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { interval, Subscription } from 'rxjs';
@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.css']
})
export class DetailPageComponent implements OnInit, OnDestroy {
  

  editInfo;
  categories: Categories[];
  article: Article;
  sCateg: Subscription;
  sArticle: Subscription;
  id = this.route.snapshot.params.id;

  form: FormGroup;
  

  constructor(private route: ActivatedRoute,
              private router: Router,
              private http: HttpService
  ) { }

  ngOnInit() {
    this.sCateg = this.http.getCategories().subscribe((cat: Categories[]) => {
      this.categories = cat;
    });
    this.sArticle = this.http.getArticle(this.id).subscribe((x: Article) => { 
      this.article = x;
      this.form = new FormGroup({
        title: new FormControl(this.article.title, Validators.required),
        body: new FormControl(this.article.body, Validators.required),
        user_id: new FormControl(localStorage.getItem('user_id'), Validators.required),
        category_id: new FormControl(this.article.category_id, Validators.required),
        active: new FormControl(this.article.active),
      });
      console.log(this.article);
       
    });
  }
  ngOnDestroy(): void {
    if (this.sCateg) {
      this.sCateg.unsubscribe();
    }
    if (this.sArticle) {
      this.sArticle.unsubscribe();
    }
  }



  editArticleSubmit() {

    console.log(this.form.value);

    this.http.editArticle(this.form.value, this.id).subscribe((edit: Article) => {
      this.editInfo = edit;
      setTimeout(() => this.router.navigate(['/Admin']), 1000);
    },
      (err) => { console.log('что -то пошло нетак'); },
    );
  }

  formValue() {
    console.log(this.form);
  }


  change(val) {
    console.log(val, this.article.title);
    if (val === true) {
      this.article.active = 1;
    } else {
      this.article.active = 0;
    }
  }
  
}
