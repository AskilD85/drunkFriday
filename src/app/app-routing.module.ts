import { AlkousersComponent } from './alkousers/alkousers.component';
import { RandomimgComponent } from './randomimg/randomimg.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { WorkComponent } from './work/work.component';
import { BlogComponent } from './blog/blog.component';
import { ContactsComponent } from './contacts/contacts.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthComponent } from './auth/auth.component';
import { MainComponent } from './main/main.component';


const routes: Routes = [
  { path: '', component: MainComponent  },
  { path: 'About', component: AboutComponent},
  { path: 'Work', component: WorkComponent},
  { path: 'Blog', component: BlogComponent},
  { path: 'Contacts', component: ContactsComponent},
  { path: 'Auth', component: AuthComponent},
  { path: 'alkouser', component: AlkousersComponent},
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
