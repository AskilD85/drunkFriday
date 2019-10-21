import { Article } from './../model/Article';
import { Component, OnInit, Injectable } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

export interface Art {
  id: string;
  url: string;
}
@Injectable()
@Component({
  selector: 'app-lara-api',
  templateUrl: './lara-api.component.html',
  styleUrls: ['./lara-api.component.css']
})



export class LaraApiComponent implements OnInit {
  myFirstReactiveForm: FormGroup;
  articles: Art;
  data: Observable<any>;
  private url = 'http://laravel5.master702.ru/api/randomimg';

  constructor(private http: HttpClient, private fb: FormBuilder) { }


  ngOnInit() {
  }


  
  /* Инициализация формы*/



}




