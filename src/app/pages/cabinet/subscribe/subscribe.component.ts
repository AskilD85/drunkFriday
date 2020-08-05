import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { HttpService } from './../../../services/http.service';
import { Categories } from 'src/app/model/Categories';
import { Subscription } from 'rxjs';
import { SubscribeService } from './../../../services/subscribe.service';
import { Subscribe } from 'src/app/model/Subscribe';
import { MatProgressSpinnerModule } from '@angular/material';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/admin/auth.service';
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
  cities = [{ name: 'Аскарово', id: 1 }
           , { name: 'Магнитогорск', id: 2 }
          , { name: 'Уфа', id: 3 }
          , { name: 'Екатеринбург', id: 4 }];
  constructor(private httpService: HttpService,
              private subscribeService: SubscribeService,
              private router: Router,
              private authService: AuthService) { }

get formData() { return this.subscribeForm.get('subscribe') as FormArray; }

  ngOnInit() {

    this.getSubscribes();

    this.getCategSub = this.httpService.getCategories()
      .subscribe((categ: Categories) => {
        this.categories = categ;
        console.log(categ);

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

  getSubscribes() {
    this.showSpinner = true;
    const userId = localStorage.getItem('user_id');
    this.subscribeService.getSubscribes(userId).subscribe(
      (data: Subscribe[]) => {
        console.log('here - ' + data[0]);
        this.subscribes = data;
        // заполнить форму подписками
        if (this.subscribes.length > 0) {
          this.fillForm(this.subscribes);
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


  fillForm(arr: Subscribe[]) {
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < arr.length; i++) {
      console.log(arr[i].city_id, typeof arr[i].city_id);
      // (this.subscribeForm.get('subscribe') as FormArray).push(
      (this.subscribeForm.controls.subscribe as FormArray).push(
        new FormGroup({
          category_id: new FormControl(arr[i].category_id, [Validators.required]),
          type: new FormControl(arr[i].type, [Validators.required]),
          city_id: new FormControl(arr[i].city_id, [Validators.required]),
          author_id: new FormControl(localStorage.getItem('user_id'), [Validators.required])
       }));
    }
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
    console.log(this.subscribes[i].id);
    this.disabled = true;
    this.subscribeService.destroy(this.subscribes[i].id).subscribe(
      () => {
        this.formData.removeAt(i);
        this.disabled = false;
       },
      (err) => { console.log(err); }
    );

  }

  saveForm() {
    console.log(this.subscribeForm.value);
    if (this.subscribeForm.invalid) {
      console.log('ивыавлид');
    } else {
      this.subscribeService.saveForm(this.subscribeForm.value.subscribe).subscribe(
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
