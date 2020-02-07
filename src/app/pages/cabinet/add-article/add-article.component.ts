import { Router } from '@angular/router';
import { Article } from './../../../model/Article';
import { Categories } from './../../../model/Categories';
import { HttpService } from 'src/app/services/http.service';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.css']
})
export class AddArticleComponent implements OnInit {

  constructor(private httpService: HttpService, private router: Router) { }

  addForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    body: new FormControl('', [Validators.required]),
    category_id: new FormControl('', [Validators.required]),
    active: new FormControl(''),
  });

  getCategSub: Subscription;
  categories: Categories;
  articles: Article[];
  success = false;

  ngOnInit() {


    this.getCategSub = this.httpService.getCategories()
        .subscribe((categ: Categories) => {
          this.categories = categ;
          console.log(this.categories);
      });
  }

  addUsluga() {
    this.httpService.addArticle(this.addForm.value).subscribe((add: Article) => {
      this.addForm.reset();
      this.success = true;
    });
  }
  addAgain() {
    this.success = false;
  }

}
