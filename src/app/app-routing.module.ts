import { SharedModule } from './_shared/shared.module';
import { AlkousersComponent } from './alkousers/alkousers.component';
import { NgModule } from '@angular/core';
import { RouterModule, CanActivate, Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { WorkComponent } from './pages/work/work.component';
import { BlogComponent } from './blog/blog.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { GeneralGuard } from './general.guards';
import { UslugiComponent } from './pages/uslugi/uslugi.component';
import { UsDetailComponent } from './pages/uslugi/us-detail/us-detail.component';
import { InfoComponent } from './pages/info/info.component';
import { CabinetComponent } from './pages/cabinet/cabinet.component';
import { LoginPageComponent } from './admin/login-page/login-page.component';
import { UserDetailComponent } from './pages/cabinet/users/user-detail/user-detail.component';


const routes: Routes = [
  { path: '', component: UslugiComponent  },
  { path: 'About', component: AboutComponent},
  { path: 'Work', component: WorkComponent, canActivate: [ GeneralGuard ]},
  { path: 'Blog', component: BlogComponent, canActivate: [ GeneralGuard ]},
  { path: 'Uslugi', component: UslugiComponent },
  { path: 'Uslugi/:id', component: UsDetailComponent },
  { path: 'Contacts', component: ContactsComponent},
  { path: 'Info', component: InfoComponent },
  { path: 'alkouser', component: AlkousersComponent},
  { path: 'Cabinet', component: CabinetComponent, canActivate: [GeneralGuard] },
  { path: 'Users/:id', component: UserDetailComponent, canActivate: [GeneralGuard] },
  { path: 'login', component: LoginPageComponent  },

  { path: 'Admin', loadChildren: './admin/admin.module#AdminModule'},
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [
RouterModule.forRoot(routes, {useHash: true}),
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
