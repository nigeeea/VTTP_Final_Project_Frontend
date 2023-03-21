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

export interface UserProfile{
    email: string;
    full_name: string;
    contact_number: number;
    address: string;
    postal_code: number;
}

export interface UserProfileUpdateResult{
    profile_updated: boolean;
}

export interface DeleteRecipeResult{
    recipe_deleted: boolean;
}