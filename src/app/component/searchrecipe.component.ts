import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormGroup, FormBuilder, Validators} from '@angular/forms'
import { Subscription } from 'rxjs';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../models';

@Component({
  selector: 'app-searchrecipe',
  templateUrl: './searchrecipe.component.html',
  styleUrls: ['./searchrecipe.component.css']
})
export class SearchrecipeComponent implements OnInit {

  recipeReceived!: Recipe
  userLogged!:string | null
  searchForm!:FormGroup
  saveRecipeForm!:FormGroup
  savedStatus!: string
  cuisineInput!:string
  

  constructor(private router: Router, private recipeSvc: RecipeService, private fb: FormBuilder){}

  ngOnInit(): void {
    //if not logged in deny access//
    console.info('user stored-->', localStorage.getItem('email'));
    this.userLogged = localStorage.getItem('email');
    if(this.userLogged === null){
      this.router.navigate(['/'])}
    //if not logged in deny access//

    this.searchForm = this.createForm()
  }

  createForm(){
    return this.fb.group({
      cuisine: this.fb.control('', [Validators.required]),
      calories: this.fb.control('', [Validators.required])
    })
  }


  logOut(){
    localStorage.removeItem('user')
    this.router.navigate(['/'])
  }

  submitForm(){
    const cuisine = this.searchForm.get('cuisine')?.value
    this.cuisineInput=cuisine
    const calories = this.searchForm.get('calories')?.value

    console.info('cuisine input>>', cuisine)
    console.info('calories input>>', calories)

    this.recipeSvc.searchRecipe(cuisine, calories)
    .then(results =>{
      console.info('in component-->recipe',results);
    this.recipeReceived=results;
    this.recipeReceived.cuisine=cuisine;})
    .catch(error => {
      console.info("some error bruh>>>", error)
    }

    )
  }

  // METHOD TO SAVE RECIPE
  saveRecipe(
    id: number,
    recipeName: string,
    image: string,
    url: string,
    calories: number
  ){

    let email: string;
    if(this.userLogged === null){
      email = "noemail"
    }
    else{ email = this.userLogged}

    const recipe_id = String(this.recipeReceived.recipe_id)
    const recipe_name = this.recipeReceived.recipe_name
    const imageValue = this.recipeReceived.image
    const urlValue = this.recipeReceived.url
    const caloriesValue = String(this.recipeReceived.calories)
    const cuisine = this.cuisineInput
    console.info('this is the id value>>>',recipe_id);
    console.info('this is the recipeName value>>>',recipe_name);
    console.info('this is the image value>>>',imageValue);
    console.info('this is the url value>>>',urlValue);
    console.info('this is the calories value>>>',caloriesValue);
    //create a method in service to post the recipe to mysql db -- remember to include the email stored in localStorage
    this.recipeSvc.saveRecipe(email,recipe_id,recipe_name,imageValue,urlValue,caloriesValue,cuisine)
    .then(results =>{
      console.info("in the component-->",results);
      //make a ui response to tell the user that recipe has been saved
      if(results.saved){this.savedStatus="your recipe has been saved"}
      else{{this.savedStatus="error: your recipe has not been saved, try again later"}}
    })
    .catch(error => {
      console.info("some error bruh>>>", error);
      //make an UI error to show user that the recipe is not saved
      this.savedStatus = "error: recipe is not saved"
    })
  }

}
