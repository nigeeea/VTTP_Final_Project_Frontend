export interface AuthenticationResult{
    authenticated: boolean;
}

export interface RegisterUserResult{
    registered: boolean;
}

export interface Recipe{
    recipe_id: number;
    recipe_name: string;
    image: string;
    url: string;
    calories: number;
    cuisine: string;
}

export interface SaveRecipeResult{
    saved: boolean;
}