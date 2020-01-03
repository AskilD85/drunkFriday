import { AuthService } from './../auth.service';
import { HttpService } from './../../services/http.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/model/Article';
import { User } from 'src/app/model/User';

@Component({
  selector: 'app-lk',
  templateUrl: './lk.component.html',
  styleUrls: ['./lk.component.css']
})
export class LkComponent implements OnInit {

  addForm = new FormGroup({
      user_id : new FormControl(localStorage.getItem('user_id'), [Validators.required]),
      title: new FormControl('', [Validators.required]),
      body: new FormControl('', [Validators.required]),
  });
  addArticle: Article;
  allArticles;
  addClick = false;
  myArticles = false;
  title = '';
  body = '';
  del;
  user: User;

  constructor(private http: HttpService, private authService: AuthService) { }

  ngOnInit() {
    this.getUser();
  }
  addUsluga() {
    console.log('addUsluga', this.addForm.value);
    this.http.addArticle(this.addForm.value).subscribe(( add: Article ) => {this.addArticle = add; this.clearForm(); } );
  }
  delete(id: string) {
    this.http.delete(id).subscribe(del => {this.del = del;  this.myUslugi(); });
  }

  myUslugi() {
    console.log('мои услуги');
    const userid = localStorage.getItem('user_id');
    this.http.getArticleOfUser(userid).subscribe((uslugi) => {this.allArticles = uslugi; console.log(this.allArticles); });
  }

  clearForm() {
    this.title = this.addForm.value.title = null;
    this.body = this.addForm.value.body = null;
  }

  getUsers() {
    this.http.getUsers().subscribe( (user: User) => {this.user = user; console.log(user); } );
  }

  getUser() {
    const userid = localStorage.getItem('user_id');
    this.http.getUser(userid).subscribe( (user: User) => {this.user = user; console.log(user); } );
  }

  
}
