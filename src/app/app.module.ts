import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AlkousersComponent } from './alkousers/alkousers.component';
import { RandomimgComponent } from './randomimg/randomimg.component';
import { MenuComponent } from './menu/menu.component';
import { NotfridayComponent } from './notfriday/notfriday.component';
import { AboutComponent } from './pages/about/about.component';
import { WorkComponent } from './pages/work/work.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { BlogComponent } from './pages/blog/blog.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SharedModule } from './_shared/shared.module';
import { UslugiComponent } from './pages/uslugi/uslugi.component';

import { AgmCoreModule } from '@agm/core';
import { UsDetailComponent } from './pages/uslugi/us-detail/us-detail.component';

import { MatDatepickerModule } from '@angular/material/datepicker';

import { MatSelectModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatSidenavModule,
  MatToolbarModule,
  MatRippleModule,
  MatNativeDateModule,
  MatIconModule,
  MatProgressSpinnerModule
  } from '@angular/material';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InfoComponent } from './pages/info/info.component';

import { registerLocaleData, CommonModule } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import { CabinetComponent } from './pages/cabinet/cabinet.component';
import { AddArticleComponent } from './pages/cabinet/add-article/add-article.component';
import { UsersComponent } from './pages/cabinet/users/users.component';
import { UserDetailComponent } from './pages/cabinet/users/user-detail/user-detail.component';
import { WebcamComponent } from './pages/webcam/webcam.component';
import { WebcamModule } from 'ngx-webcam';
import { VerificationEmailComponent } from './pages/verification-email/verification-email.component';
import { SubscribeComponent } from './pages/cabinet/subscribe/subscribe.component';
import { SubscribeService } from './services/subscribe.service';
import { DayCalculatorComponent } from './pages/day-calculator/day-calculator.component';
import { NgwWowModule } from 'ngx-wow';
import { TextMaskModule } from 'angular2-text-mask';
import { BlogAdminComponent } from './pages/cabinet/blog-admin/blog-admin.component';
import { CreateComponent } from './pages/cabinet/blog-admin/create/create.component';
import { QuillModule } from 'ngx-quill-v2';
import { AdminGuard } from './admin/admin.guards';



registerLocaleData(localeRu, 'ru');

@NgModule({
  declarations: [
    AppComponent,
    AlkousersComponent,
    RandomimgComponent,
    MenuComponent,
    NotfridayComponent,
    AboutComponent,
    WorkComponent,
    ContactsComponent,
    BlogComponent,
    NotFoundComponent,
    UslugiComponent,
    UsDetailComponent,
    InfoComponent,
    CabinetComponent,
    AddArticleComponent,
    UsersComponent,
    UserDetailComponent,
    WebcamComponent,
    VerificationEmailComponent,
    SubscribeComponent,
    DayCalculatorComponent,
    BlogAdminComponent,
    CreateComponent,

  ],
  imports: [

    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCZuwSovZWVFqgaHBwvdkbNcwgvlj14QXU'
    }),
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatNativeDateModule,
    MatDatepickerModule,
    WebcamModule,
    MatProgressSpinnerModule,
    NgwWowModule,
    QuillModule


  ],
  exports: [
    MatSelectModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    BrowserModule,
    MatRippleModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    CommonModule,
    UserDetailComponent,
    SharedModule,
    MatProgressSpinnerModule,
    NgwWowModule,
    TextMaskModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'ru' },
    SubscribeService,
    AdminGuard
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }

