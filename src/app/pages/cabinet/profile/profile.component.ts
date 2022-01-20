import { HttpService } from 'src/app/services/http.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/User';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/admin/auth.service';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
  imgUrls = new Array<string>();
  private url = environment.BackendDBUrl;

  addForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    body: new FormControl('', [Validators.required]),
    category_id: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required]),
    active: new FormControl(false),
    image: new FormControl(''),
    fileSource: new FormControl(''),
    city_id: new FormControl('', [Validators.required])
  });

  ngOnInit() {
    this.httpService.getUser(Number(this.userId)).pipe(
      map((v: any) => v.data)
    ).subscribe(
      (user: User) => { this.user = user; },
      (err) => {
        console.log(err);
        // this.authService.logout();
      }
      );

    if (localStorage.getItem('backUrl') !== null) {
      this.route.navigate([localStorage.getItem('backUrl')]);
      localStorage.removeItem('backUrl');
    }
  }

  /*handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    this.uploadFileToActivity();
  }*/

  uploadFileToActivity() {
    this.httpService.postFile(this.fileToUpload).pipe(map((v: any) => v.data)).subscribe(data => {
      // do something, if upload success
      console.log(data);
      this.user.ava_url = data.users[0].ava_url;
      this.fileToUpload = null;
      console.log(this.imgUrl);
      this.imgUrls = [];
      const id = document.getElementById('image') as HTMLInputElement;
      id.value = '';


      }, error => {
        console.log(error);
      });
  }

  handleFileInput(event) {
    let files = event.target.files;
    if (files.length > 0) {
      const file = files[0];
        this.addForm.patchValue({
          fileSource: file
        });
      
    }

    if (files) {
      for (let file of files) {
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.imgUrls.push(e.target.result);
        }
        reader.readAsDataURL(file);
      }
    }
   
    this.fileToUpload = files[0];
    
    // this.uploadFileToActivity();
  }
}
