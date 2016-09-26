/* global adal */
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Rx';

@Injectable()
export class AdalService {
    // public properties
    public get config(): adal.Config {
        return this.authContext.config;
    }
    
    public get userInfo(): OAuthData {
        return this.oauthData;
    }

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
    public login(): void {
        this.authContext.login();
    }
    
    public loginInProgress(): boolean {
        return this.authContext.loginInProgress();
    }
    
    public logOut(): void {
        this.authContext.logOut();
    }

    public getCachedToken(resource: string): string {
        return this.authContext.getCachedToken(resource);        
    }

    public acquireToken(resource:string): Observable<string> {
        // automated token request call
        return Observable.bindCallback(function (callback: (tkn: string) => void) {
            this.authContext.acquireToken(resource, function (error: string, tokenOut: string) {
                this.authContext._renewActive = false;
                if(error) {
                    this.authContext.error('Error when acquiring token for resource: ' + resource, error);
                    callback(null);
                } else {
                    callback(tokenOut);
                }
            });
        });
    }

    public getUser(): Observable<adal.User> {
        return Observable.bindCallback(function (callback: (usr: adal.User) => void) {
            this.authContext.getUser(function(error, user) {
                if(error) {
                    this.authContext.error('Error when getting user', error);
                    callback(null);
                } else {
                    callback(user);
                }
            });
        });
    }

    public getResourceForEndpoint(endpoint: string): string {
        return this.authContext.getResourceForEndpoint(endpoint);
    }

    public clearCache(): void {
        this.authContext.clearCache();
    }

    public clearCacheForResource(resource: string): void {
        this.authContext.clearCacheForResource(resource);
    }

    public info(message: string): void {
        this.authContext.info(message);
    }

    public verbose(message: string): void {
        this.authContext.verbose(message);
    }

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
