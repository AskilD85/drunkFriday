import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from 'src/app/services/http.service';
import { AuthService } from './../../admin/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-verification-email',
  templateUrl: './verification-email.component.html',
  styleUrls: ['./verification-email.component.css']
})
export class VerificationEmailComponent implements OnInit, OnDestroy {

  text = '';
  token = this.route.snapshot.params.token;
  sVerify: Subscription;
  constructor(private http: HttpClient,
              private httpService: HttpService,
              private auth: AuthService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.verificationEmail();
  }

  ngOnDestroy() {
    if (this.sVerify) {
      this.sVerify.unsubscribe();
    }
  }

  verificationEmail() {
    this.sVerify = this.httpService.verification(this.token).subscribe(
      data => {
        if (data['result'] === 'OK') {
          this.text = data['text'];
        }
        console.log(data);
        this.text = data['text'];
      },
      (err) => {
        console.log(err.status);
        if (err.status === 401) {
          this.auth.logout();
          this.addBackUrl();
        }
      }
    );
  }

  addBackUrl() {
    const route = this.route.snapshot.url;
    const backUrl = route[0].path + '/' + route[1].path;
    localStorage.setItem('backUrl', backUrl);
    console.log('back url: ', backUrl);
  }
}
