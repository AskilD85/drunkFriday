import { AlkousersComponent } from './alkousers/alkousers.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { WorkComponent } from './pages/work/work.component';
import { BlogComponent } from './pages/blog/blog.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthComponent } from './auth/auth.component';
import { MainComponent } from './pages/main/main.component';
import { GeneralGuard } from './general.guards';
import { CabinetComponent } from './pages/cabinet/cabinet.component';


const routes: Routes = [
  { path: '', component: MainComponent  },
  { path: 'About', component: AboutComponent},
  { path: 'Work', component: WorkComponent, canActivate: [ GeneralGuard ]},
  { path: 'Blog', component: BlogComponent, canActivate: [ GeneralGuard ]},
  { path: 'Contacts', component: ContactsComponent},
  { path: 'Auth', component: AuthComponent},
  { path: 'alkouser', component: AlkousersComponent},
  { path: 'Whoami', component: CabinetComponent},
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [GeneralGuard],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
