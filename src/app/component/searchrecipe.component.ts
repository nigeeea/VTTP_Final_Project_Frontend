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

  constructor(private router: Router, private recipeSvc: RecipeService, private fb: FormBuilder){}

  ngOnInit(): void {
    console.info('user stored-->', localStorage.getItem('user'));

    this.userLogged = localStorage.getItem('user');
    
    if(this.userLogged === null){
      this.router.navigate(['/'])
    }

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
    const calories = this.searchForm.get('calories')?.value

    console.info('cuisine input>>', cuisine)
    console.info('calories input>>', calories)

    this.recipeSvc.searchRecipe(cuisine, calories)
    .then(results =>{
      console.info('in component-->recipe',results);
    this.recipeReceived=results})
    .catch(error => {
      console.info("some error bruh>>>", error)
    }

    )
  }

  saveRecipe(
    id: number,
    recipeName: string,
    image: string,
    url: string,
    calories: number
  ){
    const idValue = this.recipeReceived.id
    const recipeNameValue = this.recipeReceived.recipeName
    const imageValue = this.recipeReceived.image
    const urlValue = this.recipeReceived.url
    const caloriesValue = this.recipeReceived.calories
    console.info('this is the id value>>>',idValue);
    console.info('this is the recipeName value>>>',recipeNameValue);
    console.info('this is the image value>>>',imageValue);
    console.info('this is the url value>>>',urlValue);
    console.info('this is the calories value>>>',caloriesValue);
    //insert login to post the recipe to mysql db -- remember to include the username stored in localStorage
  }

}
