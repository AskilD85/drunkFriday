import { HttpService } from './../../services/http.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/model/Article';

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
  allArticles: Article;
  addClick = false;
  myArticles = false;
  title = '';
  body = '';
  del;
  constructor(private http: HttpService) { }

  ngOnInit() {
    console.log(this.addClick);
  }
  addUsluga() {
    console.log('addUsluga', this.addForm.value);
    this.http.addArticle(this.addForm.value).subscribe(( add: Article ) => {this.addArticle = add; this.clearForm(); } );
  }
  myUslugi() {
    console.log('мои услуги');
    this.http.getArticles().subscribe((uslugi: Article) => {this.allArticles = uslugi; });
  }
  clearForm() {
    this.title = this.addForm.value.title = null;
    this.body = this.addForm.value.body = null;
  }

  delete(id: string) {
    this.http.delete(id).subscribe(del => {this.del = del;  this.myUslugi(); });
  }
}
