import { AdminGuard } from './admin.guards';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { SharedModule } from './../_shared/shared.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
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
import { UsersComponent } from './users/users.component';
import { UslugiListComponent } from './uslugi-list/uslugi-list.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { AppealsComponent } from './appeals/appeals.component';
import { CitiesComponent } from './cities/cities.component';


@NgModule({
declarations: [
    AdminLayoutComponent,
    LkComponent,
    DetailPageComponent,
    UsersComponent,
    UslugiListComponent,
    CategoryListComponent,
    AppealsComponent,
    CitiesComponent,

],
imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
        { path: '', component: AdminLayoutComponent, children: [
            { path: 'Lk', component: LkComponent },
            { path: 'Users', component: UsersComponent },
            { path: 'Services', component: UslugiListComponent },
            { path: 'Categories', component: CategoryListComponent },
            { path: 'Appeals', component: AppealsComponent },
            { path: 'Cities', component: CitiesComponent },
        ],  canActivate: [GeneralGuard, AdminGuard]   },
        { path: 'Users', component: UsersComponent, canActivate: [ GeneralGuard ] },
        { path: 'Services/Detail/:id', component: DetailPageComponent, canActivate: [ GeneralGuard ] },

    ]),
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatSlideToggleModule,

],
schemas: [CUSTOM_ELEMENTS_SCHEMA],
exports: [
    RouterModule,
    SharedModule
],
providers: [
    AdminGuard
],

})

export class AdminModule {

}

