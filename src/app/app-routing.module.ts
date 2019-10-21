import { RandomimgComponent } from './randomimg/randomimg.component';
import { LaraApiComponent } from './lara-api/lara-api.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path: 'randomimg', component: RandomimgComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
