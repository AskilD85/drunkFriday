import { SharedService } from './../../services/shared.service';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { AddAppeal } from './../../model/Appeal';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit, OnDestroy {

  addAppealForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    theme: new FormControl('', [Validators.required, Validators.minLength(4)]),
    body: new FormControl('', [Validators.required, Validators.minLength(4)]),
  });

  title = '';
  body = '';
  username = '';
  userId = localStorage.getItem('user_id');
  addAppealResponse: AddAppeal;
  saddAppealResponse: Subscription;
  constructor(private sharedService: SharedService, private http: HttpService) { }

  ngOnInit() {
    console.log('userId: ', this.userId);
  }
  ngOnDestroy() {
    if (this.saddAppealResponse) {
      this.saddAppealResponse.unsubscribe();
    }
  }


  addAppeal() {
    if (this.addAppealForm.valid) {
      console.log(this.addAppealForm.value);
      this.saddAppealResponse = this.http.addAppeal(this.addAppealForm.value)
        .subscribe((response: AddAppeal) => { this.addAppealResponse = response; console.log(this.addAppealResponse); });
      this.clearFormAll(this.addAppealForm);
    }

  }

  clearFormAll(form: FormGroup | FormArray) {
    this.sharedService.clearFormAll(form);
  }
}
