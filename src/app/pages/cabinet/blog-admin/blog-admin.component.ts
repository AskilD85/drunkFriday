import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { BlogAdminService } from './../../../services/blog-admin.service';
import { Article } from './../../../model/Article';
import { Post } from 'src/app/model/Post';
import { defaultDialogConfig } from 'src/app/_shared/default-dialog-config';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { EditPostComponent } from './edit-post/edit-post.component';


export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-blog-admin',
  templateUrl: './blog-admin.component.html',
  styleUrls: ['./blog-admin.component.scss']
})
export class BlogAdminComponent implements OnInit {

  animal: string;
  name: string;

  @Input()
  articles: Article[];
  page = '';
  @Output() postChanged = new EventEmitter();
  constructor(private apiBlog: BlogAdminService,
              private dialog: MatDialog) { }

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

  editPost(post:Post) {

    const dialogConfig = defaultDialogConfig();

    dialogConfig.data = {
      dialogTitle:"Edit Course",
      post,
      mode: 'update'
    };

    this.dialog.open(EditPostComponent, dialogConfig)
      .afterClosed()
      .subscribe(() => this.postChanged.emit());

      

}

openDialog() {
  const dialogRef = this.dialog.open(DialogContentExampleDialog);

  dialogRef.afterClosed().subscribe(result => {
    console.log(`Dialog result: ${result}`);
  });
}

}

@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'dialog-content-example-dialog.html',
})
export class DialogContentExampleDialog {}
