import { HttpService } from 'src/app/services/http.service';
import { AuthService } from './../auth.service';
import { User } from './../../model/User';
import { Subscription } from 'rxjs';
import { Appeal } from './../../model/Appeal';
import { AdminService } from './../services/admin.service';
import { Component, OnInit, OnDestroy} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-appeals',
  templateUrl: './appeals.component.html',
  styleUrls: ['./appeals.component.css'],
  providers: [AdminService]
})
export class AppealsComponent implements OnInit, OnDestroy {

  constructor(private adminService: AdminService,
              private auth: AuthService,
              private httpService: HttpService,
              private route: ActivatedRoute,
  ) { }
  appeals: Appeal[];
  sAppeals: Subscription;
  sUsers: Subscription;

  user: User;
  users: User[] = [];

  ngOnInit() {
    this.sAppeals = this.adminService.getAppeals().subscribe(
      (appeals: Appeal[]) => {
        this.appeals = appeals;
      },
      (err) => {
        console.log(err);
        this.auth.logout();
        this.addBackUrl();
       },
    );
    this.sUsers = this.httpService.getUsers().subscribe(
      (users: User[]) => { this.users = users; },
      (err) => { console.log(err), this.auth.logout(); }
    );

  }
  ngOnDestroy() {
    if (this.sAppeals) {
      this.sAppeals.unsubscribe();
    }
    if (this.sUsers) {
      this.sUsers.unsubscribe();
    }
  }
  getUserById(id: string): User[] {
    return this.users.filter( (us: User) => String(us.id) === id );
  }

  destroy(id: string) {

    this.httpService.destroyAppeal(id).subscribe(
      () => {
        this.appeals = this.appeals.filter( ( ap ) => ap.id !== id);
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
