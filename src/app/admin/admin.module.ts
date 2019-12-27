import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { SharedModule } from './../_shared/shared.module';
import { NgModule, Injectable } from '@angular/core';
import { LoginPageComponent } from './login-page/login-page.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LkComponent } from './lk/lk.component';


@NgModule({
declarations: [
    LoginPageComponent,
    AdminLayoutComponent,
    LkComponent
],
imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
        { path: '', component: AdminLayoutComponent  },
        { path: 'login', component: LoginPageComponent  },
        { path: 'Lk', component: LkComponent  },
    ])
],
exports: [
    RouterModule
],
providers: [],

})

export class AdminModule {

}
