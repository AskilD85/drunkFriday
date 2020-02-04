import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { SharedModule } from './../_shared/shared.module';
import { NgModule, Injectable } from '@angular/core';
import { LoginPageComponent } from './login-page/login-page.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LkComponent } from './lk/lk.component';
import { GeneralGuard } from '../general.guards';


import { MatSelectModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    } from '@angular/material';
import { DetailPageComponent } from './uslugi-list/detail-page/detail-page.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './users/users.component';
import { UslugiListComponent } from './uslugi-list/uslugi-list.component';
import { CategoryListComponent } from './category-list/category-list.component';

@NgModule({
declarations: [
    LoginPageComponent,
    AdminLayoutComponent,
    LkComponent,
    DetailPageComponent,
    ProfileComponent,
    UsersComponent,
    UslugiListComponent,
    CategoryListComponent,

],
imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
        { path: '', component: AdminLayoutComponent, children: [
            { path: 'Lk', component: LkComponent, canActivate: [ GeneralGuard ] },
            { path: 'Users', component: UsersComponent, canActivate: [ GeneralGuard ] },
            { path: 'Services', component: UslugiListComponent, canActivate: [ GeneralGuard ] },
            { path: 'Categories', component: CategoryListComponent, canActivate: [ GeneralGuard ] },
        ], /* canActivate: [GeneralGuard] */ },

        { path: 'login', component: LoginPageComponent  },
        { path: 'Users', component: UsersComponent, canActivate: [ GeneralGuard ] },
        { path: 'Services/Detail/:id', component: DetailPageComponent, canActivate: [ GeneralGuard ] },
        { path: 'Profile', component: ProfileComponent },

    ]),
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatSlideToggleModule,

],
exports: [
    RouterModule
],
providers: [],

})

export class AdminModule {

}

