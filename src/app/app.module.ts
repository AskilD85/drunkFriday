import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LaraApiComponent } from './lara-api/lara-api.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AlkousersComponent } from './alkousers/alkousers.component';
import { RandomimgComponent } from './randomimg/randomimg.component';

@NgModule({
  declarations: [
    AppComponent,
    LaraApiComponent,
    AlkousersComponent,
    RandomimgComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
