import { HttpService } from 'src/app/services/http.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private httpService: HttpService, private route: Router) { }
  userId = localStorage.getItem('user_id');
  user: User;
  fileToUpload: File = null;



  ngOnInit() {
    this.httpService.getUser(Number(this.userId)).subscribe( (user: User) => { this.user = user; });
    if (localStorage.getItem('backUrl') !== null) {
      this.route.navigate([localStorage.getItem('backUrl')]);
      localStorage.removeItem('backUrl');
    }
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }
/*
  uploadFileToActivity() {
    this.fileUploadService.postFile(this.fileToUpload).subscribe(data => {
      // do something, if upload success
      }, error => {
        console.log(error);
      });
  }*/

}
