import { HttpService } from 'src/app/services/http.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/User';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/admin/auth.service';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private httpService: HttpService, private route: Router,
              private authService: AuthService) { }
  userId = localStorage.getItem('user_id');
  user: User;
  fileToUpload: File = null;
  imgUrl: string;
  private url = environment.BackendDBUrl;

  ngOnInit() {
    this.httpService.getUser(Number(this.userId)).pipe(
      map((v: any) => v.data.users[0])
    ).subscribe(
      (user: User) => { this.user = user; },
      (err) => {
        console.log(err);
        this.authService.logout();
      }
      );

    if (localStorage.getItem('backUrl') !== null) {
      this.route.navigate([localStorage.getItem('backUrl')]);
      localStorage.removeItem('backUrl');
    }
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    this.uploadFileToActivity();
  }

  uploadFileToActivity() {
    this.httpService.postFile(this.fileToUpload).pipe(map((v: any) => v.data.users[0])).subscribe(data => {
      // do something, if upload success
      console.log(data);
      this.user.ava_url = data.ava_url;
      this.fileToUpload = null;
      console.log(this.imgUrl);
      console.log(this.fileToUpload);
      const id = document.getElementById('file') as HTMLInputElement;
      id.value = '';


      }, error => {
        console.log(error);
      });
  }

}
