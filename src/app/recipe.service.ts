import { Injectable} from '@angular/core'
import {HttpClient, HttpParams} from '@angular/common/http'
import{Subject, firstValueFrom} from 'rxjs'
import { AuthenticationResult, Recipe, RegisterUserResult } from './models';
import { Router } from '@angular/router';

const BACKEND = 'http://localhost:8085';

@Injectable()
export class RecipeService{

    theUser!:string;

    //authResult = new Subject<AuthenticationResult>()

    constructor(private http: HttpClient, private router: Router){}

    //METHOD TO AUTHENTICATE USER
    autheticateUser(username: string, password: string) :Promise<AuthenticationResult>{

        const params = new HttpParams().set("username", username).set("password", password)
        //storing username in local storage                                
        this.theUser=username;
        localStorage.setItem('user', username)

        return firstValueFrom(
            this.http.get<AuthenticationResult>(`${BACKEND}/api/userAuth`, {params} )
        )
        .then(results =>{
            console.info("authenticated??>>>", results);
            //this.authResult.next(results)
            return results;}
            )
    }

    //METHOD TO REGISTER USER
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


    //LOGOUT METHOD - SHOULD BE IN EVERY COMPONENT TS IN NAVBAR
    logOut(){
        localStorage.removeItem('user')
        this.router.navigate(['/'])
    }

}