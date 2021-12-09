import { HttpService } from 'src/app/services/http.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/User';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/admin/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private httpService: HttpService, private route: Router,
              private authService: AuthService) { }
  userId = localStorage.getItem('user_id');
  user: User;
  fileToUpload: File = null;
  img_url: string;
  private url = environment.BackendDBUrl;

  ngOnInit() {
    this.httpService.getUser(Number(this.userId)).subscribe( 
      (user: User) => { this.user = user; },
      (err) => {
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
    this.httpService.postFile(this.fileToUpload).subscribe(data => {
      // do something, if upload success
      console.log(data);
      this.img_url = this.url + data;
      console.log(this.img_url);
      
      }, error => {
        console.log(error);
      });
  }

}
