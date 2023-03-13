import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login.component';
import { SearchrecipeComponent } from './component/searchrecipe.component';
import { SignupComponent } from './component/signup.component';
import { UserhomeComponent } from './component/userhome.component';

const routes: Routes = [
  {path:"", component: LoginComponent},
  {path:"register", component: SignupComponent},
  {path:"home", component: UserhomeComponent},
  {path: 'findarecipe', component: SearchrecipeComponent},
  { path: '**', redirectTo: '/', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
