import { User } from './../../model/User';
import { HttpService } from 'src/app/services/http.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Categories } from 'src/app/model/Categories';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit, OnDestroy {

  constructor( private httpService: HttpService) { }
  categories: Categories[] = [];
  users: User[] = [];

  sCategories: Subscription;
  sUsers: Subscription;
  sDestroyCateg: Subscription;

  ngOnInit() {
    this.sCategories = this.httpService.getCategories().subscribe( (categ: Categories[]) => { this.categories = categ; });
    this.sUsers = this.httpService.getUsers().subscribe( (user: User[]) => { this.users = user; });
  }

  ngOnDestroy() {
    if (this.sCategories) {
      this.sCategories.unsubscribe();
    }
    if (this.sUsers) {
      this.sUsers.unsubscribe();
    }
    if (this.sDestroyCateg) {
      this.sDestroyCateg.unsubscribe();
    }
  }

   getUserById(id: number) {
    if (this.users) {
      return this.users.filter((c) => c.id === id);
    }
  }
  destroy(id: string) {
    this.sDestroyCateg = this.httpService.destroyCategory(id).subscribe(
      () => { this.categories = this.categories.filter(c => c.id !== id); },
    );
  }
}
