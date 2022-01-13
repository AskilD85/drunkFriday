import { Router } from '@angular/router';
import { Article } from './../../../model/Article';
import { Categories } from './../../../model/Categories';
import { HttpService } from 'src/app/services/http.service';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { City } from 'src/app/model/City';
import { ArticleType } from 'src/app/model/ArticleTypes';
import { AuthService } from 'src/app/admin/auth.service';
import { CabinetService } from 'src/app/services/cabinet.service';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.scss']
})
export class AddArticleComponent implements OnInit, OnDestroy {

  constructor(private httpService: HttpService,
              private router: Router,
              private authService: AuthService,
              private cabinetService: CabinetService
              ) { }

  addForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    body: new FormControl('', [Validators.required]),
    category_id: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required]),
    active: new FormControl(false),
    image: new FormControl(''),
    fileSource: new FormControl(''),
    city_id: new FormControl('', [Validators.required])
  });

  getCategSub: Subscription;
  addPostSub: Subscription;
  sAuth: Subscription;
  categories: Categories;
  posts: Article[];
  success = false;
  checked = true;
  cities: City[];
  addFormFlag: Boolean = false;
  postType: ArticleType[];
  location : string;
  sPosts: Subscription;
  sDeletePost: Subscription;
  fileToUpload: File = null;
  img_url: string;
  private url = environment.BackendDBUrl;
  showSpinner = false;
  imgUrls = new Array<string>();
  reader = new FileReader();

  ngOnInit() {
  this.sAuth = this.authService.checkToken().subscribe(
    (data)=> { console.log(data);
    }
  );
  this.getCategSub = this.httpService.getCategories()
        .subscribe((categ: Categories) => {
          this.categories = categ;
      });
  this.getPostTypes();
  this.getCities();
  this.getPosts();    
  }



  ngOnDestroy(): void {
    if (this.getCategSub) {
      this.getCategSub.unsubscribe();
    }
    if (this.addPostSub) {
      this.addPostSub.unsubscribe();
    }
    if (this.sDeletePost) {
      this.sDeletePost.unsubscribe();
    }
    
  }
  getCities() {
    this.httpService.getCities().subscribe(
      (data: City[]) => {
        this.cities = data;
      }
    );
  }

  addPost() {
    console.log('here -' + this.addForm);
    this.addPostSub = this.httpService.addPost(this.addForm.value).subscribe((add: Article) => {
      
      this.addForm.reset();
      this.success = true;
      setTimeout(()=>{this.success = false;},1000)
      this.addFormActive(false);
      this.posts.unshift(add);
    },
      err => { console.log(err), console.log('here -' + this.addForm.value); });
  }

  getPostTypes() {
    this.httpService.getPostTypes().subscribe(
      (data: ArticleType[]) => {
        this.postType=data;
      },
      (err) => {console.log(err); }
      );
  }

  addAgain() {
    this.success = false;
    this.checked = true;
  }
  clear() {
    this.addForm.setValue({
      active: true,
      title: null,
      body: null,
      category_id: null
    });
  }
  addFormActive(bool: boolean) {
    this.addForm.controls.city_id.setValue('1');
    this.addFormFlag = bool;
    if (bool === false) {
      this.imgUrls = [];
      this.addForm.reset()
    }
  }

  getPosts() {
    const userid = localStorage.getItem('user_id');
    this.showSpinner = true;
    this.sPosts = this.httpService.getPostsOfUser(userid).pipe(
      map((v:any) => v.data)
    )
    .subscribe(
      ( posts: Article[]) => {
        this.showSpinner = false;
        this.posts = posts; },
        (err)=> {
          console.log(err);
          this.showSpinner = false;
        }
    );
  }

  delete(id: number) {
    this.sDeletePost = this.httpService.delete(id).subscribe(() => {
      this.posts = this.posts.filter( posts => posts.id !== id);
    },
    (err)=> {console.log(err);
    });
  }

  handleFileInput(event) {
    let files = event.target.files;
    if (files.length > 0) {
      const file = files[0];
      console.log(typeof files);

        this.addForm.patchValue({
          fileSource: file
        });
      
    }

    if (files) {
      for (let file of files) {
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.imgUrls.push(e.target.result);
        }
        reader.readAsDataURL(file);
      }
    }
   
    this.fileToUpload = files[0];
    
    // this.uploadFileToActivity();
  }

 


  
}
