import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent {

  constructor(private recipeSvc: RecipeService, private router:Router) {}

  //in this component create a form to update profile information - refer to users and contact tables in mysql

  logOut(){
    this.recipeSvc.logOut()
    this.router.navigate(['/'])
}
}
