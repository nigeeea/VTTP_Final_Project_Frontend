import { Injectable} from '@angular/core'
import {HttpClient, HttpParams} from '@angular/common/http'
import{Subject, firstValueFrom} from 'rxjs'
import { AuthenticationResult, Recipe, RegisterUserResult, SaveRecipeResult } from './models';
import { Router } from '@angular/router';

const BACKEND = 'http://localhost:8085';

@Injectable()
export class RecipeService{

    theUser!:string;
    favourites!: Recipe[]

    //authResult = new Subject<AuthenticationResult>()

    constructor(private http: HttpClient, private router: Router){}

    //METHOD TO AUTHENTICATE USER/LOGIN -- MYSQL
    autheticateUser(email: string, password: string) :Promise<AuthenticationResult>{

        const params = new HttpParams().set("email", email).set("password", password)
        //storing username in local storage                                
        this.theUser=email;
        localStorage.setItem('email', email)

        return firstValueFrom(
            this.http.post<AuthenticationResult>(`${BACKEND}/api/userAuth`, params )
        )
        .then(results =>{
            console.info("authenticated??>>>", results);
            //this.authResult.next(results)
            return results;}
            )
    }

    //METHOD TO REGISTER USER -- MONGO OUTDATED
    registerUser(username: string, password: string): Promise<RegisterUserResult>{
        const params = new HttpParams().set("username", username).set("password", password);

        return firstValueFrom(
            this.http.post<RegisterUserResult>(`${BACKEND}/api/register`, params )
        )
        .then(results=>{
            console.info("registered???>>>", results);

            return results;
        })
    }

    //METHOD TO REGISTER USER -- MYSQL
    registerUsersql(email: string, 
                    password: string, 
                    full_name: string, 
                    contact_number: string,
                    address: string,
                    postal_code: string): Promise<RegisterUserResult>{
        const params = new HttpParams().set("email", email)
                                        .set("password", password)
                                        .set("full_name", full_name)
                                        .set("contact_number", contact_number)
                                        .set("address", address)
                                        .set("postal_code", postal_code);

        return firstValueFrom(
            this.http.post<RegisterUserResult>(`${BACKEND}/api/registersql`, params )
        )
        .then(results=>{
            console.info("registered???>>>", results);

            return results;
        })
    }

    //METHOD TO SEARCH RECIPE
    searchRecipe(cuisine: string, calories: string): Promise<Recipe>{

        const params = new HttpParams().set("cuisine", cuisine).set("calories", calories);

        return firstValueFrom(
            this.http.get<Recipe>(`${BACKEND}/api/testapi`, {params} )
        )
        .then(results => {
            console.info("in service--recipe???>>>", results);
            return results;
        }
        )
    }


    //METHOD TO SAVE SEARCHED RECIPE
    saveRecipe(email: string,
                recipe_id: string,
                recipe_name: string,
                image: string,
                url: string,
                calories: string,
                cuisine: string): Promise<SaveRecipeResult>{

        const params = new HttpParams().set("email", email)
                                        .set("recipe_id",recipe_id)
                                        .set("recipe_name",recipe_name)
                                        .set("image",image)
                                        .set("url",url)
                                        .set("calories",calories)
                                        .set("cuisine", cuisine);
            
       return firstValueFrom(
            this.http.post<SaveRecipeResult>(`${BACKEND}/api/saveRecipe`, params )
        )
        .then(results=>{
            console.info("in service--recipe Saved??>>", results);

            return results;
        }) 

    }

    getFavourites(email: string): Promise<Recipe[]>{

        const params = new HttpParams().set("email", email);

        return firstValueFrom(
            this.http.get<Recipe[]>(`${BACKEND}/api/getFavourites`, {params} )
        )
        .then(results=>{
            this.favourites=results;
            console.info(results);
            return results;
        })
    }

    //LOGOUT METHOD - SHOULD BE IN EVERY COMPONENT TS AND BUTTON IN COMPONENT HTML NAVBAR
    logOut(){
        localStorage.removeItem('email')
        this.router.navigate(['/'])
    }

}