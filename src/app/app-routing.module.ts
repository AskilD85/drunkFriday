import { SharedModule } from './_shared/shared.module';
import { AlkousersComponent } from './alkousers/alkousers.component';
import { NgModule } from '@angular/core';
import { RouterModule, CanActivate, Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { WorkComponent } from './pages/work/work.component';
import { BlogComponent } from './pages/blog/blog.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { GeneralGuard } from './general.guards';
import { UslugiComponent } from './pages/uslugi/uslugi.component';
import { UsDetailComponent } from './pages/uslugi/us-detail/us-detail.component';
import { InfoComponent } from './pages/info/info.component';
import { CabinetComponent } from './pages/cabinet/cabinet.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { UserDetailComponent } from './pages/cabinet/users/user-detail/user-detail.component';
import { WebcamComponent } from './pages/webcam/webcam.component';
import { ProfileComponent } from './pages/cabinet/profile/profile.component';
import { VerificationEmailComponent } from './pages/verification-email/verification-email.component';
import { ResetPasswComponent } from './pages/reset-passw/reset-passw.component';
import { DayCalculatorComponent } from './pages/day-calculator/day-calculator.component';
import { AdminGuard } from './admin/admin.guards';


const routes: Routes = [
  // { path: '', component: UslugiComponent  },
  { path: '', component: UslugiComponent },
  { path: 'About', component: AboutComponent},
  { path: 'Work', component: WorkComponent, canActivate: [ GeneralGuard ]},
  { path: 'Blog', component: BlogComponent},
  { path: 'Uslugi', component: UslugiComponent },
  { path: 'Uslugi/:id', component: UsDetailComponent },
  { path: 'Contacts', component: ContactsComponent},
  { path: 'Info', component: InfoComponent },
  { path: 'alkouser', component: AlkousersComponent},
  { path: 'Profile', component: ProfileComponent , canActivate: [GeneralGuard] },
  { path: 'Cabinet/:page', component: CabinetComponent },
  { path: 'Users/:id', component: UserDetailComponent, canActivate: [GeneralGuard] },
  { path: 'login', component: LoginPageComponent  },
  { path: 'verification/:token', component: VerificationEmailComponent },
  { path: 'resetPassw/:token', component: ResetPasswComponent },
  { path: 'webcam', component: WebcamComponent },
  { path: 'Day-calculator', component: DayCalculatorComponent },
  { path: 'Admin', loadChildren: './admin/admin.module#AdminModule', canActivate: [GeneralGuard,AdminGuard] },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [
RouterModule.forRoot(routes, {useHash: true}),
  SharedModule
  ],

  providers: [GeneralGuard, AdminGuard],
  exports: [
    RouterModule,
    SharedModule,
  ]
})
export class AppRoutingModule {

 }
