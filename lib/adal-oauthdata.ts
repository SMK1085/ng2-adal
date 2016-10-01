export class OAuthData {
    // public properties
    isAuthenticated: boolean;
    userName: string;
    loginError: string;
    profile: any;

    constructor() {
        this.isAuthenticated = false;
    }
}