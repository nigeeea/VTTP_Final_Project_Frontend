import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormGroup, FormBuilder} from '@angular/forms'
import { RecipeService } from '../recipe.service';
import { Recipe } from '../models';
import { retry, Subscription } from 'rxjs';


@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit{

  userLogged!: string | null

  favouriteRecipes:Recipe[]=[];

  constructor(private router: Router, private recipeSvc: RecipeService, private fb: FormBuilder){ }

  ngOnInit(): void {

    //if not logged in deny access//
    console.info('user stored-->', localStorage.getItem('email'));
    this.userLogged = localStorage.getItem('email');
    if(this.userLogged === null){
      this.router.navigate(['/'])}
    //if not logged in deny access//

      //get all the favourite recipes and store in a Recipe[]
      
      let email: string;

        if(this.userLogged === null) 
        {email = "noemail"}
        else{email = this.userLogged}

      this.recipeSvc.getFavourites(email)
      .then(results =>
        {console.info("returned>>",results);
          this.favouriteRecipes=results;
          console.info("Recipe Array>>", this.favouriteRecipes)
        return results;}
      )
      .catch(error=>
        {console.info("error", error)
        return error;}
        )
      
      
  }

  deleteRecipe(i: number){
    let email: string;

      if(this.userLogged === null) 
      {email = "noemail"}
      else{email = this.userLogged}
    
    const recipe_id = this.favouriteRecipes[i].recipe_id
    const recipe_name = this.favouriteRecipes[i].recipe_name

    console.info("email address-->", email);
    console.info("recipe ID-->", recipe_id);
    console.info("recipe name-->", recipe_name);

    //create function in service to delete from recipes
    this.recipeSvc.deleteRecipe(email, recipe_id)
    .then(
      results=>{
        console.info("in component", results)
        this.favouriteRecipes.splice(i, 1);
      }
    )
  }
      // gettingFavourites(){
      //   let email: string;

      //   if(this.userLogged === null) 
      //   {email = "noemail"}
      //   else{email = this.userLogged}

      //   this.recipeSvc.getFavourites(email)
      // .then(results =>
      //   {console.info("returned>>",results);
      //     this.favouriteRecipes=results;
      //     console.info("Recipe Array>>", this.favouriteRecipes)
      //   return results;}
      // )
      // .catch(error=>
      //   {console.info("error", error)
      //   return error;}
      //   )

        
      // }

      logOut(){
        this.recipeSvc.logOut()
        this.router.navigate(['/'])
    }
}
