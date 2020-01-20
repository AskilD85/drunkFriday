import { Subscription } from 'rxjs';
import { Article } from './../../model/Article';
import { Categories } from './../../model/Categories';
import { AuthService } from './../auth.service';
import { HttpService } from './../../services/http.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from 'src/app/model/User';

@Component({
  selector: 'app-lk',
  templateUrl: './lk.component.html',
  styleUrls: ['./lk.component.css']
})
export class LkComponent implements OnInit, OnDestroy {

  addForm = new FormGroup({
    user_id: new FormControl(localStorage.getItem('user_id'), [Validators.required]),
    title: new FormControl('', [Validators.required]),
    body: new FormControl('', [Validators.required]),
    category_id: new FormControl('', [Validators.required]),
  });
  addCategForm = new FormGroup({
    author_id: new FormControl(localStorage.getItem('user_id'), [Validators.required]),
    name: new FormControl('', [Validators.required]),
    body: new FormControl('', [Validators.required]),
  });
  editArticleForm = new FormGroup({
    user_id: new FormControl(localStorage.getItem('user_id'), [Validators.required]),
    title: new FormControl('', [Validators.required]),
    body: new FormControl('', [Validators.required]),
    category_id: new FormControl('', [Validators.required]),
  });

  addArticle: Article;
  allArticles: Article;

  addCateg: Categories;
  categories: Categories;

  addClick = false;
  myArticles = false;
  addCategPage = false;
  editPage = false;

  title = '';
  body = '';
  del;

  user: User;

  getUserSub: Subscription;
  getCategSub: Subscription;
  myUslugiSub: Subscription;
  constructor(private http: HttpService, private authService: AuthService) { }

  ngOnInit() {
    this.getUser();
    this.getCategories();
  }

  ngOnDestroy() {
    
  }

  addUsluga() {
    console.log('addUsluga', this.addForm.value);
    this.http.addArticle(this.addForm.value).subscribe((add: Article) => { this.addArticle = add; this.clearForm(); });
  }
  delete(id: string) {
    this.http.delete(id).subscribe(del => { this.del = del; this.myUslugi(); });
  }

  myUslugi() {
    console.log('мои услуги');
    const userid = localStorage.getItem('user_id');
    this.myUslugiSub = this.http.getArticleOfUser(userid).subscribe((uslugi: Article) => { 
    this.allArticles = uslugi; console.log(this.allArticles); });
  }

  clearForm() {
    this.title = this.addForm.value.title = null;
    this.body = this.addForm.value.body = null;
  }

  getUsers() {
    this.getUserSub = this.http.getUsers().subscribe((user: User) => { this.user = user; console.log(user); });
  }

  getUser() {
    const userid = localStorage.getItem('user_id');
    this.http.getUser(userid).subscribe((user: User) => { this.user = user; console.log(user); });
  }

  getCategories() {
    this.getCategSub = this.http.getCategories().subscribe((categ: Categories) => { 
      this.categories = categ;
      console.log('here: ', this.categories); });
  }
  

  /*reverse2(str: string) {
    const result = str.split('').reverse().join('');
    console.log('reverse:   ', result );

    function Counter() {
      let i = 1;
      return ( function() {
        return (i++);
      });
    }
    const c = Counter();
    console.log( c());
    console.log( c());
    console.log( c());
  }*/
  addCategSubmit() {
    if (this.addCategForm.valid) {
      this.http.addCategories(this.addCategForm.value).subscribe((categ: Categories) => {
        this.addCateg = categ;
        this.getCategories();
        this.addCategPage = false;
      }, (err) => { console.log(err); },
        () => {
          this.getCategories();
          this.addCategPage = false;
        });
    }
    console.log('addCateg', this.addCategForm.value);
  }
  editArticle(i) {
    console.log(i);

  }
  
}

