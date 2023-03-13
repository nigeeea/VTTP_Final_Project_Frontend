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

  userLogged!:string | null

  constructor(private recipeSvc: RecipeService, private router:Router) {}

  ngOnInit(): void {

      console.info('user stored-->', localStorage.getItem('user'));

      this.userLogged = localStorage.getItem('user');
      
      if(this.userLogged === null){
        this.router.navigate(['/'])
      }
      // this.userLogged=this.recipeSvc.theUser;
      // localStorage.setItem('user', this.userLogged)

      // const storedUser = localStorage.getItem('user');
      // console.log('the stored user',storedUser);
      // this.userLogged = localStorage.getItem('user');
    }

    logOut(){
      localStorage.removeItem('user')
      this.router.navigate(['/'])
  }
}
