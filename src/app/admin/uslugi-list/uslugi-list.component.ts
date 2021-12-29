import { Categories } from './../../model/Categories';
import { HttpService } from './../../services/http.service';
import { Article } from './../../model/Article';
import { Subscription } from 'rxjs';
import { AuthService } from './../auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../services/admin.service';
import { City } from 'src/app/model/City';
import { Types } from 'src/app/model/LK/Types';

@Component({
  selector: 'app-uslugi-list',
  templateUrl: './uslugi-list.component.html',
  styleUrls: ['./uslugi-list.component.css'],
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

  addType: Types;
  types: Types;

  addClick = false;
  myArticles = false;
  addCategPage = false;
  addTypePage = false;
  editPage = false;
  location = localStorage.getItem('location') !== null ? localStorage.getItem('location') : 1;
  cities: City[];


  addForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    body: new FormControl('', [Validators.required]),
    category_id: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required]),
    city_id: new FormControl(localStorage.getItem('location'), [Validators.required])
  });
  addCategForm = new FormGroup({
   //  author_id: new FormControl(localStorage.getItem('user_id'), [Validators.required]),
    name: new FormControl('', [Validators.required]),
    body: new FormControl('', [Validators.required]),
  });

  addTypeForm = new FormGroup({
     name: new FormControl('', [Validators.required]),
   });

  editArticleForm = new FormGroup({
    user_id: new FormControl(localStorage.getItem('user_id'), [Validators.required]),
    title: new FormControl('', [Validators.required]),
    body: new FormControl('', [Validators.required]),
    category_id: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required]),
  });


  constructor(private authService: AuthService,
              private http: HttpService,
              private router: Router,
              private adminService: AdminService
    ) { }



  ngOnInit() {
    this.getCities();
    this.getUslugi();
    this.getCategories();
    this.getTypes();

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
  getCities() {
    this.http.getCities().subscribe(
      (data: City[]) => {
        this.cities = data;
      }
    );
  }

  getUslugi() {
    this.adminService.getArticles().subscribe(
      (uslugi: Article[]) => {
        this.allArticles = uslugi;
      }
    );
  }


  delete(id: number) {
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

  getTypes() {
    this.getCategSub = this.http.getTypes().subscribe((types: Types) => {
    this.types = types;
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

  addTypeSubmit() {
    if (this.addTypeForm.valid) {
      this.http.addTypes(this.addTypeForm.value).subscribe((types: Types) => {
        this.addType = types;
        this.getTypes();
        this.addTypePage = false;
        this.addTypeForm.reset();
      }, (err) => { console.log(err); },
        () => {
          this.getTypes();
          this.addTypePage = false;
        });
    }
    console.log('addType', this.addTypeForm.value, this.addTypeForm );
  }


  addUsluga() {
    console.log(this.addForm.value);

    this.http.addPost(this.addForm.value).subscribe((add: Article) => {
      this.addArticle = add;
      this.addClick = false;
      this.addForm.reset();
      this.getUslugi();
      setTimeout ( () => this.router.navigate(['Admin', 'Services', 'Detail', this.addArticle.id ]) , 1000) ;
    });
  }
}
