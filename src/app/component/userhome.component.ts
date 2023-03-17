import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-userhome',
  templateUrl: './userhome.component.html',
  styleUrls: ['./userhome.component.css']
})
export class UserhomeComponent implements OnInit{

  emailLogged!:string | null

  constructor(private recipeSvc: RecipeService, private router:Router) {}

  ngOnInit(): void {

      //if not logged in deny access//
      console.info('email stored-->', localStorage.getItem('email'));
      this.emailLogged = localStorage.getItem('email');
      if(this.emailLogged === null){
        this.router.navigate(['/'])}
      //if not logged in deny access//

      // this.userLogged=this.recipeSvc.theUser;
      // localStorage.setItem('user', this.userLogged)

      // const storedUser = localStorage.getItem('user');
      // console.log('the stored user',storedUser);
      // this.userLogged = localStorage.getItem('user');
    }

    logOut(){
      this.recipeSvc.logOut()
      this.router.navigate(['/'])
  }
}
