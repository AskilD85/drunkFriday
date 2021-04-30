import { Component, OnInit } from '@angular/core';
import { BlogAdminService } from './../../../services/blog-admin.service';
import { Article } from './../../../model/Article';

@Component({
  selector: 'app-blog-admin',
  templateUrl: './blog-admin.component.html',
  styleUrls: ['./blog-admin.component.scss']
})
export class BlogAdminComponent implements OnInit {
  articles: Article[];
  page = '';
  constructor(private apiBlog: BlogAdminService) { }

  ngOnInit() {
    this.getAllArticles();
  }

  getAllArticles() {
  // tslint:disable-next-line: variable-name
  const user_id = localStorage.getItem('user_id');
  this.apiBlog.getArticlesForUser(user_id).subscribe(
    (data: Article[]) => { this.articles = data; }
  );
  }


  activePage(page) {
    this.page = page;
    // this.visibility = true;
  }
}
