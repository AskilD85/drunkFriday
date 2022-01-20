import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Article } from 'src/app/model/Article';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit, OnDestroy {

  constructor(private activateRoute: ActivatedRoute,
    private httpService: HttpService,
    private router: Router
  ) { }

  sgetPost: Subscription;
  id: any;
  private routeSubscription: Subscription;
  post: Article;
  editForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    body: new FormControl('', [Validators.required]),
    category_id: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required]),
    active: new FormControl(false),
    image: new FormControl(''),
    fileSource: new FormControl(''),
    city_id: new FormControl('', [Validators.required])
  });

  form: FormGroup

  ngOnInit() {
    //console.log(this.id);
    this.routeSubscription = this.activateRoute.params.subscribe(params => this.id = params['id']);

    console.log(this.id);
    this.getDetailPost(this.id);
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
    if (this.sgetPost) {
      this.sgetPost.unsubscribe();
    }
  }
  getDetailPost(id: number) {
    this.sgetPost = this.httpService.getArticle(this.id).subscribe(
      (data: Article) => {
        console.log(data);
        this.post = data;
        this.form = new FormGroup(
          { title: new FormControl(data.title, [Validators.required]),
          body: new FormControl(data.body, [Validators.required]),
          category_id: new FormControl(data.category_id, [Validators.required]),
          type: new FormControl(data.type, [Validators.required]),
          active: new FormControl(data.active),
          image: new FormControl(),
          fileSource: new FormControl(''),
          }
        )
      }
    )
  }

}