import { Categories } from './../../model/Categories';
import { HttpService } from './../../services/http.service';
import { Article } from './../../model/Article';
import { Subscription } from 'rxjs';
import { AuthService } from './../auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from 'src/app/model/User';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent implements OnInit, OnDestroy {

  sSub: Subscription;
  myUslugiSub: Subscription;
  getCategSub: Subscription;

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
              private router: Router
    ) { }



  ngOnInit() {


      this.authService.checkAuth();
      this.sSub = this.authService.authEmit.subscribe(auth => {
        this.isAuth = auth;
        if (this.isAuth === true) {
            this.router.navigate(['Admin', 'Lk']);
        }
      });



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

  }

  myUslugi() {
    const userid = localStorage.getItem('user_id');
    if (userid != null && userid !== undefined) {
      this.myUslugiSub = this.http.getArticleOfUser(userid).subscribe((uslugi: Article[]) => {
        this.allArticles = uslugi;
      });
    }

  }

  delete(id: string) {
    this.http.delete(id).subscribe(del => { this.del = del;  this.myUslugi();  });
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
    console.log('addUsluga', this.addForm.value);
    this.http.addArticle(this.addForm.value).subscribe((add: Article) => {
      this.addArticle = add;
      this.addClick = false;
      this.addForm.reset();
      this.myUslugi();
      setTimeout ( () => this.router.navigate(['Admin', 'Detail', this.addArticle.id ]) , 1000) ;
    });
  }
}
