import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms'
import {Route, Router} from '@angular/router'
import { AuthenticationResult } from '../models';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  loginForm!: FormGroup
  authResult!:AuthenticationResult

  constructor(private fb: FormBuilder, private router: Router, private recipeSvc: RecipeService){}

  ngOnInit(): void {

    if(localStorage.getItem('user') !== null){
      this.router.navigate(['/home']);
    }

      this.loginForm = this.createForm()
  }

  createForm(){
    return this.fb.group({
      username: this.fb.control('', [Validators.required]),
      password: this.fb.control('', [Validators.required])
    })
  }

  submitForm(){
    const username = this.loginForm.get('username')?.value
    const password = this.loginForm.get('password')?.value
    console.info('username is here>>>', username)
    console.info('password is here>>>', password)

    this.recipeSvc.autheticateUser(username, password)
    .then(results =>{
      console.info(results);
      //this.authResult=results;

      if(results.authenticated){
        this.router.navigate(['/home'])
      }
      else{
        console.info('failed login')
      }
    })
    .catch(error => {
      console.info("some error bruh>>>", error)
    })
    
  }

  //check database to authenticate username and password <= done in the service.. time to setup a mongodb...
    //if success => navigate to user home page
    // this.recipeSvc.authenticateUser();
    
    //this.router.navigate(['/home'])

    //else => failed page.. ask user to reset password or sign up

}
