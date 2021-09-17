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
  // categories: Categories[];
  categories = [{ id: 1, name: '1 категория'}, {id: 2, name: '2 категория'}, { id: 3, name: '3 категория'}];
  subscribeForm = new FormGroup({
    subscribe: new FormArray([
    ])
  });
  getCategSub: Subscription;
  array = [];
  constructor(private httpService: HttpService) { }
  get formData() { return this.subscribeForm.get('subscribe') as FormArray; }

  ngOnInit() {
   /* this.getCategSub = this.httpService.getCategories()
      .subscribe((categ: Categories[]) => {
        this.categories = categ;
      });*/
  }
  ngOnDestroy() {
    if (this.getCategSub) {
      this.getCategSub.unsubscribe();
    }
  }
  add() {
    (this.subscribeForm.get('subscribe') as FormArray).push(
      new FormGroup({
        title: new FormControl('', Validators.required),
        city: new FormControl('1', Validators.required)
      }));
  }
  destroy(i: number) {
    this.formData.removeAt(i);
    const saveArray = this.subscribeForm.get('subscribe').value;
    console.log(saveArray[i]);
  }
  saveForm() {
    console.log((this.subscribeForm.get('subscribe')).value);

   

  }
  selectionChange(index) {
    const saveArray = this.subscribeForm.get('subscribe').value;
    console.log(saveArray[0]);
    for (let i = 0; i < saveArray.length; i++) {

      // this.categories.splice(i, 1);
    }
    this.subscribeForm.get('subscribe').valueChanges.subscribe(
      value => {
        console.log(1, value);
      }
    );
    
  }


  valueFunc(i) {
    const saveArray = this.subscribeForm.get('subscribe').value;
    
    return i;
  }
}
