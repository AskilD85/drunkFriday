import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AlkousersComponent } from './alkousers/alkousers.component';
import { RandomimgComponent } from './randomimg/randomimg.component';
import { MenuComponent } from './menu/menu.component';
import { NotfridayComponent } from './notfriday/notfriday.component';
import { AboutComponent } from './pages/about/about.component';
import { MainComponent } from './pages/main/main.component';
import { WorkComponent } from './pages/work/work.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { BlogComponent } from './pages/blog/blog.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthComponent } from './auth/auth.component';
import { TokenInterceptor } from './_helpers/token.interceptor';
import { CabinetComponent } from './pages/cabinet/cabinet.component';
import { TestComponent } from './test/test.component';



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
    AuthComponent,
    CabinetComponent,
    TestComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

