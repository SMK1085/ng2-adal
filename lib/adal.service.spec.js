System.register(['@angular/core/testing', '@angular/platform-browser', './adal.service', './adal-config', './login.component'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var testing_1, platform_browser_1, adal_service_1, adal_config_1, login_component_1;
    var testConfig;
    return {
        setters:[
            function (testing_1_1) {
                testing_1 = testing_1_1;
            },
            function (platform_browser_1_1) {
                platform_browser_1 = platform_browser_1_1;
            },
            function (adal_service_1_1) {
                adal_service_1 = adal_service_1_1;
            },
            function (adal_config_1_1) {
                adal_config_1 = adal_config_1_1;
            },
            function (login_component_1_1) {
                login_component_1 = login_component_1_1;
            }],
        execute: function() {
            describe('AdalService', function () {
                var adalService;
                var config = {
                    clientId: 'e9a5a8b6-8af7-4719-9821-0deef255f68e',
                    loginResource: 'defaultResource'
                };
                beforeEach(function () {
                    adalService = new adal_service_1.AdalService(config);
                });
                it('can be instantiated', function () {
                    expect(adalService).toBeDefined();
                });
                it('has been configured', function () {
                    expect(adalService.config.loginResource).toBe('defaultResource');
                    expect(adalService.config.clientId).toBe('e9a5a8b6-8af7-4719-9821-0deef255f68e');
                });
                it('states the user is unauthenticated by default', function () {
                    expect(adalService.userInfo).toBeDefined();
                    expect(adalService.userInfo.isAuthenticated).toBe(false);
                });
            });
            describe('AdalService with TestBed', function () {
                var fixture;
                var comp;
                var adalService;
                var de;
                var el;
                var spyCachedToken;
                var spyLogin;
                beforeEach(function () {
                    testing_1.TestBed.configureTestingModule({
                        declarations: [login_component_1.LoginComponent],
                        providers: [adal_service_1.AdalService,
                            { provide: adal_config_1.AdalConfig, useClass: testConfig }]
                    });
                    fixture = testing_1.TestBed.createComponent(login_component_1.LoginComponent);
                    comp = fixture.componentInstance;
                    adalService = fixture.debugElement.injector.get(adal_service_1.AdalService);
                    spyCachedToken = spyOn(adalService, 'getCachedToken')
                        .and.callFake(function (resource) {
                        console.log(resource);
                        if (resource === 'resource1') {
                            return 'Token3434';
                        }
                        else if (resource === 'resource2') {
                            return 'Token123';
                        }
                        else if (resource === adalService.config.loginResource) {
                            return 'Token456';
                        }
                        else {
                            return '';
                        }
                    });
                    de = fixture.debugElement.query(platform_browser_1.By.css('.user-login'));
                    el = de.nativeElement;
                });
                it('it should have no user before OnInit', function () {
                    expect(comp.userInfo).toBeUndefined();
                });
                it('should assign an unauthenticated user', function () {
                    fixture.detectChanges();
                    expect(comp.userInfo.isAuthenticated).toBe(false);
                });
                it('retrieves a proper token for resource1', function () {
                    var token = adalService.getCachedToken('resource1');
                    expect(spyCachedToken.calls.any()).toBe(true, 'getCachedToken called');
                    expect(token).toBe('Token3434');
                });
                it('retrieves a proper token for resource2', function () {
                    var token = adalService.getCachedToken('resource2');
                    expect(spyCachedToken.calls.any()).toBe(true, 'getCachedToken called');
                    expect(token).toBe('Token123');
                });
                it('retrieves a proper token for defaultResource', function () {
                    var token = adalService.getCachedToken('defaultResource');
                    expect(spyCachedToken.calls.any()).toBe(true, 'getCachedToken called');
                    expect(token).toBe('Token456');
                });
                it('retrieves no token for an unknown resource', function () {
                    var token = adalService.getCachedToken('resource99');
                    expect(spyCachedToken.calls.any()).toBe(true, 'getCachedToken called');
                    expect(token).toBe('');
                });
            });
            testConfig = (function () {
                function testConfig() {
                }
                return testConfig;
            }());
        }
    }
});
//# sourceMappingURL=adal.service.spec.js.map