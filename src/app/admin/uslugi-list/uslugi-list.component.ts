import { Categories } from './../../model/Categories';
import { HttpService } from './../../services/http.service';
import { Article } from './../../model/Article';
import { Subscription } from 'rxjs';
import { AuthService } from './../auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-uslugi-list',
  templateUrl: './uslugi-list.component.html',
  styleUrls: ['./uslugi-list.component.css']
})
export class UslugiListComponent implements OnInit, OnDestroy {


  sSub: Subscription;
  myUslugiSub: Subscription;
  getCategSub: Subscription;
  sDeleteArticle: Subscription;
  isAuth: boolean;
  allArticles: Article[] = [];
  del;

  addArticle: Article;
  addCateg: Categories;
  categories: Categories;

  addClick = false;
  myArticles = false;
  addCategPage = false;
  editPage = false;

  addForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    body: new FormControl('', [Validators.required]),
    category_id: new FormControl('', [Validators.required]),
  });
  addCategForm = new FormGroup({
   //  author_id: new FormControl(localStorage.getItem('user_id'), [Validators.required]),
    name: new FormControl('', [Validators.required]),
    body: new FormControl('', [Validators.required]),
  });
  editArticleForm = new FormGroup({
    user_id: new FormControl(localStorage.getItem('user_id'), [Validators.required]),
    title: new FormControl('', [Validators.required]),
    body: new FormControl('', [Validators.required]),
    category_id: new FormControl('', [Validators.required]),
  });


  constructor(private authService: AuthService,
              private http: HttpService,
              private router: Router,
    ) { }



  ngOnInit() {
    this.getUslugi();
    this.getCategories();


  }
  ngOnDestroy(): void {
    if (this.sSub) {
      this.sSub.unsubscribe();
    }
    if (this.myUslugiSub) {
      this.myUslugiSub.unsubscribe();
    }
    if (this.getCategSub) {
      this.getCategSub.unsubscribe();
    }
    if (this.sDeleteArticle) {
      this.sDeleteArticle.unsubscribe();
    }

  }

  getUslugi() {
    this.http.getArticles().subscribe(
      (uslugi: Article[]) => {
        this.allArticles = uslugi;
      }
    );
  }


  delete(id: string) {
    this.sDeleteArticle = this.http.delete(id).subscribe(del => {
      this.del = del;
      this.allArticles = this.allArticles.filter( articles => articles.id !== id);
    });
  }
  getCategories() {
    this.getCategSub = this.http.getCategories().subscribe((categ: Categories) => {
      this.categories = categ;
    });
  }

  addCategSubmit() {
    if (this.addCategForm.valid) {
      this.http.addCategories(this.addCategForm.value).subscribe((categ: Categories) => {
        this.addCateg = categ;
        this.getCategories();
        this.addCategPage = false;
        this.addCategForm.reset();
      }, (err) => { console.log(err); },
        () => {
          this.getCategories();
          this.addCategPage = false;
        });
    }
    console.log('addCateg', this.addCategForm.value, this.addCategForm );
  }
  addUsluga() {
    this.http.addArticle(this.addForm.value).subscribe((add: Article) => {
      this.addArticle = add;
      this.addClick = false;
      this.addForm.reset();
      this.getUslugi();
      setTimeout ( () => this.router.navigate(['Admin', 'Services', 'Detail', this.addArticle.id ]) , 1000) ;
    });
  }
}
