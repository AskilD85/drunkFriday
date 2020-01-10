import { SharedModule } from './_shared/shared.module';
import { AlkousersComponent } from './alkousers/alkousers.component';
import { RandomimgComponent } from './randomimg/randomimg.component';
import { NgModule } from '@angular/core';
import { RouterModule, CanActivate, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { WorkComponent } from './pages/work/work.component';
import { BlogComponent } from './blog/blog.component';
import { ContactsComponent } from './contacts/contacts.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { MainComponent } from './main/main.component';
import { GeneralGuard } from './general.guards';
import { UslugiComponent } from './pages/uslugi/uslugi.component';
import { UsDetailComponent } from './pages/uslugi/us-detail/us-detail.component';


const routes: Routes = [
  { path: '', component: MainComponent  },
  { path: 'About', component: AboutComponent},
  { path: 'Work', component: WorkComponent, canActivate: [ GeneralGuard ]},
  { path: 'Blog', component: BlogComponent, canActivate: [ GeneralGuard ]},
  { path: 'Uslugi', component: UslugiComponent },
  { path: 'Uslugi/:id', component: UsDetailComponent },
  { path: 'Contacts', component: ContactsComponent},
  { path: 'alkouser', component: AlkousersComponent},
  { path: 'Admin', loadChildren: './admin/admin.module#AdminModule'},
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    SharedModule
  ],
  providers: [GeneralGuard],
  exports: [
    RouterModule,
    SharedModule,
  ]
})
export class AppRoutingModule {

 }
