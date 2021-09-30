import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment.prod';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from './../../admin/auth.service';
import { Subscription } from 'rxjs';
import { ServerResponse } from '../login-page/login-page.component';


@Component({
  selector: 'app-reset-passw',
  templateUrl: './reset-passw.component.html',
  styleUrls: ['./reset-passw.component.css']
})
export class ResetPasswComponent implements OnInit, OnDestroy {

  resetPassForm = new FormGroup({
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    password_confirmation: new FormControl('', [Validators.required, Validators.minLength(8)]),
    recaptcha: new FormControl('', [Validators.required])
  });
  recaptchaSiteKey = environment.recaptchaSiteKey;
  token = this.route.snapshot.params.token;
  sCheck: Subscription;
  sSavePass: Subscription;
  isValidToken: boolean;
  text: string;
  isResetPassForm = true;
  constructor(private route: ActivatedRoute, private auth: AuthService) { }

  ngOnInit() {
    localStorage.clear();
    this.checkToken();
  }
  ngOnDestroy() {
    if (this.sCheck) {
      this.sCheck.unsubscribe();
    }
  }

  checkToken() {
    this.sCheck = this.auth.resetPasswCheckToken(this.token).subscribe(
      (data: ServerResponse) => {
        console.log(data);
        if (data.result === 'OK') {
          this.isValidToken = true;
        }
        if (data.result === 'error') {
          this.isValidToken = false;
          this.text = data.text;
        }
      },
      err => { console.log(err); },
    );
  }


  saveNewPass() {
    this.sSavePass = this.auth.saveNewPass(this.resetPassForm.value, this.token).subscribe(
      (data: ServerResponse) => {
        this.isResetPassForm = false;
        this.text = data.text;
        console.log(data); },
      err => { console.log(err); },
    );
  }
  addBackUrl() {
    const route = this.route.snapshot.url;
    const backUrl = route[0].path + '/' + route[1].path;
    localStorage.setItem('backUrl', backUrl);
    console.log('back url: ', backUrl);
  }
}
