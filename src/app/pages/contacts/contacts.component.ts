import { SharedService } from './../../services/shared.service';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  addAppealForm = new FormGroup({
    username : new FormControl('', [Validators.required]),
    title: new FormControl('', [Validators.required]),
    body: new FormControl('', [Validators.required]),
  });

  title = '';
  body = '';
  username = '';
  constructor( private sharedService: SharedService) { }

  ngOnInit() {
  }


  addAppeal() {
    if (this.addAppealForm.valid) {
      console.log('OK');
      this.clearFormAll(this.addAppealForm);
    }

  }

  clearFormAll(form: FormGroup | FormArray) {
    this.sharedService.clearFormAll(form);
  }
}
