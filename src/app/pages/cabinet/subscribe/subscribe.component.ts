import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { HttpService } from './../../../services/http.service';
import { Categories } from 'src/app/model/Categories';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.scss']
})
export class SubscribeComponent implements OnInit, OnDestroy {
  categories: Categories;

  subscribeForm = new FormGroup({
    subscribe: new FormArray([

    ])
  });
  getCategSub: Subscription;
  success = false;
  message: string;

  constructor(private httpService: HttpService) { }
  get formData() { return this.subscribeForm.get('subscribe') as FormArray; }

  ngOnInit() {
    this.getCategSub = this.httpService.getCategories()
      .subscribe((categ: Categories) => {
        this.categories = categ;
      });
  }

  ngOnDestroy() {
    if (this.getCategSub) {
      this.getCategSub.unsubscribe();
    }
  }

  getSubscribes() {
    null;
  }

  
  add() {
    (this.subscribeForm.get('subscribe') as FormArray).push(
      new FormGroup({
        city_id: new FormControl('', [Validators.required]),
        category_id: new FormControl('', [Validators.required]),
        type: new FormControl('', [Validators.required]),
        author_id: new FormControl(localStorage.getItem('user_id'), [Validators.required])
      }));
  }


  destroy(i: number) {
    this.formData.removeAt(i);
  }

  saveForm() {
    console.log(this.subscribeForm.value);
    if (this.subscribeForm.invalid) {
      console.log('ивыавлид');
    } else {
      this.httpService.subscribe(this.subscribeForm.value.subscribe).subscribe(
        (data: any) => {
          console.log(data);
          if (data.res === 'OK') {
            this.success = true;
            this.message = data.msg;
          }

        },
      );
    }



  }


}
