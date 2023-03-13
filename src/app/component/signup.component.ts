import { Component } from '@angular/core';
import {FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn} from '@angular/forms'
import { RecipeService } from '../recipe.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent{
  signupForm!: FormGroup

  passWordStrength!: boolean


  constructor(private fb: FormBuilder, private recipeSvc: RecipeService){

    this.signupForm= this.createForm();

  }

  createForm(){
    return this.fb.group({
      username: this.fb.control('', [Validators.required, Validators.minLength(5)]),
      password: this.fb.control('', [Validators.required, Validators.minLength(5)]),
      passwordAgain: this.fb.control('',  [Validators.required, Validators.minLength(5), this.passwordMatchingValidator('password')])
    })
  }

  submitForm(){
    const username = this.signupForm.get('username')?.value
    const password = this.signupForm.get('password')?.value
    const passwordAgain = this.signupForm.get('passwordAgain')?.value

    console.info('user>>>',username)
    console.info('pass>>>',password)
    console.info('reentered pass>>>',passwordAgain)

    //USE THE SERVICE TO INSERT THE NEW USER INTO THE USERS MONGO COLLECTION
    this.recipeSvc.registerUser(username, password)
    .then(results =>{
      console.info(results)
    })
    .catch(error => {
      console.info("some error bruh>>>", error)
    })

  }

  get username() {
    return this.signupForm.get('username')
  }

  get password() {
    return this.signupForm.get('password')
  }

  get passwordAgain() {
    return this.signupForm.get('passwordAgain')
  }

  //https://dzone.com/articles/how-to-create-custom-validators-in-angular
  //matchControlName is the value of the 'password' control
  //this function returns a validator function that will be used to match the values of 'passwordAgain' and 'password'
  passwordMatchingValidator(passwordInput: string): ValidatorFn 
  {
    return (control: AbstractControl): 
    //{ [key: string]: any } | null => 
    { [key: string]: boolean } | null =>
    {     
      const password = control.parent?.get(passwordInput)?.value

      const passwordAgain = control.value

      if(password === passwordAgain){return null}
      
      else{return {passwordMatch: true}}
    }
  }



}


