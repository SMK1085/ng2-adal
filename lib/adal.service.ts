/* global adal */
import { Injectable } from '@angular/core';

@Injectable()
export class AdalService {
    // public properties

    // private fields
    private authContext: adal.AuthenticationContext;
    private oauthData: OAuthData;

    constructor(private configOptions: adal.Config) {
        if (this.configOptions) {
            // redirect and logout_redirect are set to current location by default
            let existingHash:string = window.location.hash;
            let pathDefault: string = window.location.href;
            
            if (existingHash) {
                pathDefault = pathDefault.replace(existingHash, '');
            }

            this.configOptions.redirectUri = this.configOptions.redirectUri || pathDefault;
            this.configOptions.postLogoutRedirectUri = this.configOptions.postLogoutRedirectUri || pathDefault;

            // create instance with given config
            this.authContext = new AuthenticationContext(this.configOptions);
        }   else {
            throw new Error('You must set configOptions when calling the constructor.');            
        }

        // loginResource is used to set authenticated status
        this.updateDataFromCache(this.authContext.config.loginResource);     
    }

    // public methods


    // private methods
    private updateDataFromCache(resource: string): void {
        let token: string = this.authContext.getCachedToken(resource);
        this.oauthData.isAuthenticaed = token !== null && token.length > 0;
        let user: adal.User = this.authContext.getCachedUser() || new adal.User() { userName: ''};
        this.oauthData.userName = user.userName;
        this.oauthData.profile = user.profile;
        this.oauthData.loginError = this.authContext.getLoginError();
    }
}

export class OAuthData {
    // public properties
    isAuthenticaed: boolean;
    userName: string;
    loginError: string;
    profile: any;
}
