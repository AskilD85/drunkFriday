import { Component, OnInit } from '@angular/core';
import { BlogAdminService } from './../../services/blog-admin.service';
import { Post } from 'src/app/model/Post';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  posts: Post[];
  constructor(private apiBlog: BlogAdminService) { }

  ngOnInit() {
    
    this.getAllArticles();
    
  }

  getAllArticles() {
    this.apiBlog.getAllArticles().subscribe(
      (data: Post[]) => { 
        this.posts = data; }
    );
  }
}
