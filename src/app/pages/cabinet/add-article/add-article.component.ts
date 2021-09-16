import { Router } from '@angular/router';
import { Article } from './../../../model/Article';
import { Categories } from './../../../model/Categories';
import { HttpService } from 'src/app/services/http.service';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { map } from 'rxjs/operators';
import { City } from 'src/app/model/City';
import { ArticleType } from 'src/app/model/ArticleTypes';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.css']
})
export class AddArticleComponent implements OnInit, OnDestroy {

  constructor(private httpService: HttpService, private router: Router) { }

  addForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    body: new FormControl('', [Validators.required]),
    category_id: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required]),
    active: new FormControl(false),
    city_id: new FormControl(localStorage.getItem('location'), [Validators.required])
  });

  getCategSub: Subscription;
  addArticleSub: Subscription;
  categories: Categories;
  articles: Article[];
  success = false;
  checked = true;
  cities: City[];
  articleType: ArticleType[];
  location = localStorage.getItem('location') !== null ? localStorage.getItem('location') : 1;


  ngOnInit() {
  this.getCategSub = this.httpService.getCategories()
        .subscribe((categ: Categories) => {
          this.categories = categ;
      });
  this.getTypeArticles();
  this.getCities();
  }
  ngOnDestroy(): void {
    if (this.getCategSub) {
      this.getCategSub.unsubscribe();
    }
    if (this.addArticleSub) {
      this.addArticleSub.unsubscribe();
    }
  }
  getCities() {
    this.httpService.getCities().subscribe(
      (data: City[]) => {
        this.cities = data;
      }
    );
  }
  addUsluga() {
    this.addArticleSub = this.httpService.addArticle(this.addForm.value).subscribe((add: Article) => {
      console.log('here -' + this.addForm.value);
      this.addForm.reset();
      this.success = true;
    },
      err => { console.log(err), console.log('here -' + this.addForm.value); });
  }

  getTypeArticles() {
    this.httpService.getArticlesType().subscribe(
      (data: ArticleType[]) => {
        this.articleType=data;
      },
      (err)=> {console.log(err)}
      
    )
  }

  addAgain() {
    this.success = false;
    this.checked = true;
  }
  clear() {
    this.addForm.setValue({
      active: true,
      title: null,
      body: null,
      category_id: null
    });
  }

}
