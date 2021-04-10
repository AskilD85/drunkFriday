import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BlogAdminService } from './../../../../services/blog-admin.service';
import { Subscription } from 'rxjs';
import { Article } from './../../../../model/Article';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit, OnDestroy {

  addForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    body: new FormControl('', [Validators.required]),
    active: new FormControl(false),
  });
  success = false;
  isModal = false;
  checked = true;
  constructor(private blogAdminService: BlogAdminService) { }
  addArticleSub: Subscription;

  ngOnInit() {
  }

  ngOnDestroy(): void {
    if (this.addArticleSub) {
      this.addArticleSub.unsubscribe();
    }
  }

  checkModalW() {
    if (this.isModal) {
      alert('3333');
    }
  }

  addArticle() {
    this.addArticleSub = this.blogAdminService.addArticle(this.addForm.value).subscribe((add: Article) => {
      console.log('here -' + this.addForm.value);
      this.addForm.reset();
      this.success = true;
    },
      err => { console.log(err), console.log('here -' + this.addForm.value); });
  }

  itIsonlyModalW() {
    console.log('hello!');
  }
}
