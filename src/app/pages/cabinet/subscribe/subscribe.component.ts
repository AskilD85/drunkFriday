import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { HttpService } from './../../../services/http.service';
import { Categories } from 'src/app/model/Categories';
import { Subscription } from 'rxjs';
import { SubscribeService } from './../../../services/subscribe.service';
import { Subscribe } from 'src/app/model/Subscribe';
import { MatProgressSpinnerModule, MatFormField } from '@angular/material';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/admin/auth.service';
import { SharedService } from 'src/app/services/shared.service';
import { City } from 'src/app/model/City';
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
  sDeleteSubscribe: Subscription;
  showSpinner = false;
  subscribes: Subscribe[];
  disabled = false;
  success = false;
  message: string;
  cities: City[];
  location = '2';
  constructor(private httpService: HttpService,
              private subscribeService: SubscribeService,
              private router: Router,
              private authService: AuthService,
              private sharedService: SharedService) { }

get formData() { return this.subscribeForm.get('subscribe') as FormArray; }

  ngOnInit() {

    this.getSubscribes();
    this.getCities();
    this.getCategSub = this.httpService.getCategories()
      .subscribe((categ: Categories) => {
        this.categories = categ;

      });
  }

  ngOnDestroy() {
    if (this.getCategSub) {
      this.getCategSub.unsubscribe();
    }
    if (this.sDeleteSubscribe) {
      this.sDeleteSubscribe.unsubscribe();
    }

  }

  getCities() {
    this.httpService.getCities().subscribe(
      (data: City[]) => {
        this.cities = data;
        // console.log(this.cities);
      }
    );
  }

  getSubscribes() {
    this.showSpinner = true;
    const userId = localStorage.getItem('user_id');
    this.subscribeService.getSubscribes(userId).subscribe(
      (data: Subscribe[]) => {
        console.log( data);
        this.subscribes = data;
        // заполнить форму подписками
        if (this.subscribes.length > 0) {
          this.fillForm(this.subscribes, this.subscribeForm);
          console.log('форма - ', this.subscribeForm.controls.subscribe);
        }
        this.showSpinner = false;
      },
      (err) => {
        console.log(err.status);
        if (err.status === 401) {
          this.authService.logout();
        }
       }
    );
  }


  fillForm(arr: Subscribe[], form: FormArray | FormGroup) {
    this.subscribeService.clearForm(form, 'subscribe');
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < arr.length; i++) {
      // (this.subscribeForm.get('subscribe') as FormArray).push(
      (this.subscribeForm.controls.subscribe as FormArray).push(
        new FormGroup({
          category_id: new FormControl(arr[i].category_id, [Validators.required]),
          type: new FormControl(arr[i].type, [Validators.required]),
          city_id: new FormControl(arr[i].city_id, [Validators.required]),
          author_id: new FormControl(localStorage.getItem('user_id'), [Validators.required]),
          id: new FormControl(arr[i].id)
       }));
    }
  }


  add() {
    (this.subscribeForm.get('subscribe') as FormArray).push(
      new FormGroup({
        city_id: new FormControl('', [Validators.required]),
        category_id: new FormControl('', [Validators.required]),
        type: new FormControl('', [Validators.required]),
        author_id: new FormControl(localStorage.getItem('user_id'), [Validators.required]),
      }));
  }


  destroy(i: number, id?: number) {
    this.disabled = true;
    if (id === null || id === undefined) {
      this.formData.removeAt(i);
      this.disabled = false;
    } else {

    this.subscribeService.destroy(id).subscribe(
      () => {
        this.formData.removeAt(i);
        this.disabled = false;
      },
      (err) => { console.log(err); }
    );
    }
  }

  saveForm() {
    if (this.subscribeForm.invalid) {
    } else {
      this.showSpinner = true;
      this.subscribeService.saveForm(this.subscribeForm.value.subscribe).subscribe(
        (data: any) => {
          if (data.res === 'OK') {
            this.success = true;
            this.message = data.msg;
            this.fillForm(data.data, this.subscribeForm);
            this.showSpinner = false;
          }

        },
        (err) => {
          if (err.status === 401) {
            this.authService.logout();
          }
        }
      );
    }



  }


}
