import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { HttpService } from './../../../services/http.service';
import { Categories } from 'src/app/model/Categories';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.css']
})
export class SubscribeComponent implements OnInit, OnDestroy {
  categories: Categories;
  subscribeForm = new FormGroup({
    title: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    subscribe: new FormArray([

    ])
  });
  getCategSub: Subscription;

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
  add() {
    (this.subscribeForm.get('subscribe') as FormArray).push(
       new FormControl('33', Validators.required) );
  }
  destroy(i: number) {
    this.formData.removeAt(i);
  }
  saveForm() {
    console.log(this.subscribeForm.value);
  }
}
