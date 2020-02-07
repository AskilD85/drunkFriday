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
import { MainComponent } from './main/main.component';
import { WorkComponent } from './pages/work/work.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { BlogComponent } from './blog/blog.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SharedModule } from './_shared/shared.module';
import { UslugiComponent } from './pages/uslugi/uslugi.component';

import { AgmCoreModule } from '@agm/core';
import { UsDetailComponent } from './pages/uslugi/us-detail/us-detail.component';


import { MatSelectModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatSidenavModule,
  MatToolbarModule,
  MatRippleModule,
  MatIconModule  } from '@angular/material';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InfoComponent } from './pages/info/info.component';

import { registerLocaleData, CommonModule } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import { CabinetComponent } from './pages/cabinet/cabinet.component';
registerLocaleData(localeRu, 'ru');

@NgModule({
  declarations: [
    AppComponent,
    AlkousersComponent,
    RandomimgComponent,
    MenuComponent,
    NotfridayComponent,
    AboutComponent,
    MainComponent,
    WorkComponent,
    ContactsComponent,
    BlogComponent,
    NotFoundComponent,
    UslugiComponent,
    UsDetailComponent,
    InfoComponent,
    CabinetComponent,

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
    CommonModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'ru' }
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }

