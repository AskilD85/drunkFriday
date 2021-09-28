import { Component, OnInit } from '@angular/core';
import { BlogAdminService } from './../../services/blog-admin.service';
import { Article } from './../../model/Article';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  articles: Article[];
  constructor(private apiBlog: BlogAdminService) { }

  ngOnInit() {
    
    this.getAllArticles();
    
  }

  getAllArticles() {
    this.apiBlog.getAllArticles().subscribe(
      (data: Article[]) => { 
        
        this.articles = data; }
    );
  }
}
