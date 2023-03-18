import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserProfile } from '../models';
import { RecipeService } from '../recipe.service';
import {FormGroup, FormBuilder, Validators} from '@angular/forms'

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit{

  userLogged!: string | null

  userProfile!:UserProfile

  toEdit: boolean = true;

  editProfileForm!:FormGroup

  constructor(private recipeSvc: RecipeService, private router:Router, private fb: FormBuilder) {}

  ngOnInit(): void {

    //if not logged in deny access//
    console.info('user stored-->', localStorage.getItem('email'));
    this.userLogged = localStorage.getItem('email');
    if(this.userLogged === null){
      this.router.navigate(['/'])}
    //if not logged in deny access//

    //get all the user profile and store in userProfile
      
    let email: string;

    if(this.userLogged === null) 
    {email = "noemail"}
    else{email = this.userLogged}

    //create function in service
    this.recipeSvc.getUserProfile(email)
    .then(results =>
      {console.info("returned>>",results);
        this.userProfile=results;
        console.info("This the profile>>", this.userProfile)
      return results;}
    )
    .catch(error=>
      {console.info("error", error)
      return error;}
      )
      
      this.editProfileForm=this.createForm()
  }

  createForm(){
    return this.fb.group({
      email: this.fb.control({value: '', disabled: this.toEdit}, [Validators.required]),
      full_name: this.fb.control({value: '', disabled: this.toEdit}, [Validators.required]),
      contact_number: this.fb.control({value: '', disabled: this.toEdit}, [Validators.required]),
      address: this.fb.control({value: '', disabled: this.toEdit}, [Validators.required]),
      postal_code: this.fb.control({value: '', disabled: this.toEdit}, [Validators.required])
    })
  }

  //********MUST REVISIT THIS PORTION*****
  //edit button - when clicked the button will give the user the option to edit their details
  edit(){
    //https://stackoverflow.com/questions/42840136/disable-input-fields-in-reactive-form
    //this.form.controls['name'].disable();
    this.editProfileForm.controls['email'].enable()
    this.editProfileForm.controls['full_name'].enable()
    this.editProfileForm.controls['contact_number'].enable()
    this.editProfileForm.controls['address'].enable()
    this.editProfileForm.controls['postal_code'].enable()
    // this.toEdit=false;
  }

  //in this component create a form to update profile information - refer to users and contact tables in mysql

  logOut(){
    this.recipeSvc.logOut()
    this.router.navigate(['/'])
}
}
