System.register(['@angular/core', 'rxjs/Rx', './adal-config', './adal-oauthdata'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, Rx_1, adal_config_1, adal_oauthdata_1;
    var AdalService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (Rx_1_1) {
                Rx_1 = Rx_1_1;
            },
            function (adal_config_1_1) {
                adal_config_1 = adal_config_1_1;
            },
            function (adal_oauthdata_1_1) {
                adal_oauthdata_1 = adal_oauthdata_1_1;
            }],
        execute: function() {
            exports_1("AdalConfig", adal_config_1.AdalConfig);
            exports_1("OAuthData", adal_oauthdata_1.OAuthData);
            AdalService = (function () {
                // ctor
                function AdalService(configOptions) {
                    this.authContext = {};
                    if (configOptions) {
                        // redirect and logout_redirect are set to current location by default
                        var existingHash = window.location.hash;
                        var pathDefault = window.location.href;
                        if (existingHash) {
                            pathDefault = pathDefault.replace(existingHash, '');
                        }
                        this.adalConfig = configOptions;
                        this.adalConfig.redirectUri = this.adalConfig.redirectUri || pathDefault;
                        this.adalConfig.postLogoutRedirectUri = this.adalConfig.postLogoutRedirectUri || pathDefault;
                        // create instance with given config
                        this.authContext = new AuthenticationContext(this.adalConfig);
                    }
                    else {
                        //     console.log('ERROR: You must set configOptions when calling the constructor.');
                        throw new Error('You must set configOptions when calling the constructor.');
                    }
                    // loginResource is used to set authenticated status
                    this.updateDataFromCache(this.authContext.config.loginResource);
                }
                Object.defineProperty(AdalService.prototype, "config", {
                    // public properties
                    get: function () {
                        return this.authContext.config;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AdalService.prototype, "userInfo", {
                    get: function () {
                        return this.oauthData;
                    },
                    enumerable: true,
                    configurable: true
                });
                // public methods
                AdalService.prototype.login = function () {
                    this.authContext.login();
                };
                AdalService.prototype.loginInProgress = function () {
                    return this.authContext.loginInProgress();
                };
                AdalService.prototype.logOut = function () {
                    this.authContext.logOut();
                };
                AdalService.prototype.getCachedToken = function (resource) {
                    return this.authContext.getCachedToken(resource);
                };
                AdalService.prototype.acquireToken = function (resource) {
                    // automated token request call
                    return Rx_1.Observable.bindCallback(function (callback) {
                        this.authContext.acquireToken(resource, function (error, tokenOut) {
                            this.authContext._renewActive = false;
                            if (error) {
                                this.authContext.error('Error when acquiring token for resource: ' + resource, error);
                                callback(null);
                            }
                            else {
                                callback(tokenOut);
                            }
                        });
                    })();
                };
                AdalService.prototype.getUser = function () {
                    return Rx_1.Observable.bindCallback(function (callback) {
                        this.authContext.getUser(function (error, user) {
                            if (error) {
                                this.authContext.error('Error when getting user', error);
                                callback(null);
                            }
                            else {
                                callback(user);
                            }
                        });
                    })();
                };
                AdalService.prototype.getResourceForEndpoint = function (endpoint) {
                    return this.authContext.getResourceForEndpoint(endpoint);
                };
                AdalService.prototype.clearCache = function () {
                    this.authContext.clearCache();
                };
                AdalService.prototype.clearCacheForResource = function (resource) {
                    this.authContext.clearCacheForResource(resource);
                };
                AdalService.prototype.info = function (message) {
                    this.authContext.info(message);
                };
                AdalService.prototype.verbose = function (message) {
                    this.authContext.verbose(message);
                };
                // private methods
                AdalService.prototype.updateDataFromCache = function (resource) {
                    if (!this.oauthData) {
                        this.oauthData = new adal_oauthdata_1.OAuthData();
                    }
                    var token = this.authContext.getCachedToken(resource);
                    this.oauthData.isAuthenticated = token !== null && token.length > 0;
                    var user = this.authContext.getCachedUser() || { userName: '' };
                    this.oauthData.userName = user.userName;
                    this.oauthData.profile = user.profile;
                    this.oauthData.loginError = this.authContext.getLoginError();
                };
                AdalService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [adal_config_1.AdalConfig])
                ], AdalService);
                return AdalService;
            }());
            exports_1("AdalService", AdalService);
        }
    }
});
//# sourceMappingURL=adal.service.js.map