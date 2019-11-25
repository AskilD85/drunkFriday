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
import { AboutComponent } from './about/about.component';
import { MainComponent } from './main/main.component';
import { WorkComponent } from './work/work.component';
import { ContactsComponent } from './contacts/contacts.component';
import { BlogComponent } from './blog/blog.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthComponent } from './auth/auth.component';
import { ChatComponent } from './chat/chat.component';
import { TokenInterceptor } from './_helpers/token.interceptor';



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
    ChatComponent
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

