export interface AuthenticationResult{
    authenticated: boolean;
}

export interface RegisterUserResult{
    registered: boolean;
}

export interface Recipe{
    id: number;
    recipeName: string;
    image: string;
    url: string;
    calories: number;
}