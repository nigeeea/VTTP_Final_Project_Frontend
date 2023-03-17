import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FavouritesComponent } from './component/favourites.component';
import { LoginComponent } from './component/login.component';
import { RegisterComponent } from './component/register.component';
import { SearchrecipeComponent } from './component/searchrecipe.component';
import { UserhomeComponent } from './component/userhome.component';

const routes: Routes = [
  {path:"", component: LoginComponent},
  {path:"registration", component: RegisterComponent},
  {path:"home", component: UserhomeComponent},
  {path: 'findarecipe', component: SearchrecipeComponent},
  {path:'savedrecipes', component: FavouritesComponent},
  { path: '**', redirectTo: '/', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
