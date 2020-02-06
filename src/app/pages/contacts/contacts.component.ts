import { environment } from './../../../environments/environment';
import { SharedService } from './../../services/shared.service';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { Appeal } from './../../model/Appeal';
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
    recaptcha: new FormControl('', [Validators.required]),
  });

  title = '';
  body = '';
  username = '';
  userId = localStorage.getItem('user_id');
  addAppealResponse: Appeal;
  saddAppealResponse: Subscription;

  recaptchaSiteKey = environment.recaptchaSiteKey;

  constructor(private sharedService: SharedService,
              private http: HttpService,
              ) { }

  ngOnInit() {
  }
  ngOnDestroy() {
    if (this.saddAppealResponse) {
      this.saddAppealResponse.unsubscribe();
    }
  }


  addAppeal() {
    if (this.addAppealForm.valid) {
      this.saddAppealResponse = this.http.addAppeal(this.addAppealForm.value)
        .subscribe((response: Appeal) => { this.addAppealResponse = response; });
      this.clearFormAll(this.addAppealForm);
    }

  }

  clearFormAll(form: FormGroup | FormArray) {
    this.sharedService.clearFormAll(form);
  }

  resolved(event) {
    this.sharedService.resolved(event);
  }

}
