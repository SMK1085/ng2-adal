import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, Injectable } from '@angular/core';

import { AdalService } from './adal.service';
import { AdalConfig } from './adal-config';
import { AdalUser } from './adal-user';
import { OAuthData } from './adal-oauthdata';

import { LoginComponent } from './login.component';

describe('AdalService', () => {
    let adalService: AdalService;
    const config: AdalConfig = {
        clientId: 'e9a5a8b6-8af7-4719-9821-0deef255f68e',
        loginResource: 'defaultResource'
    };

    beforeEach(() => {
        adalService = new AdalService(config);
    });

    it('can be instantiated', () => {
        expect(adalService).toBeDefined();
    })

    it('has been configured', () => {
        expect(adalService.config.loginResource).toBe('defaultResource');
        expect(adalService.config.clientId).toBe('e9a5a8b6-8af7-4719-9821-0deef255f68e');
    })

    it('states the user is unauthenticated by default', () => {
        expect(adalService.userInfo).toBeDefined();
        expect(adalService.userInfo.isAuthenticated).toBe(false);
    });
})


describe('AdalService with TestBed', () => {
    let fixture: ComponentFixture<LoginComponent>;
    let comp: LoginComponent;
    let adalService: AdalService;
    let de: DebugElement;
    let el: any;
    let spyCachedToken: jasmine.Spy;
    let spyLogin: jasmine.Spy;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [LoginComponent],
            providers: [AdalService,
                { provide: AdalConfig, useClass: testConfig }]
        });

        fixture = TestBed.createComponent(LoginComponent);
        comp = fixture.componentInstance;

        adalService = fixture.debugElement.injector.get(AdalService);

        spyCachedToken = spyOn(adalService, 'getCachedToken')
            .and.callFake((resource: string) => {
                console.log(resource);
                if (resource === 'resource1') {
                    return 'Token3434';
                } else if (resource === 'resource2') {
                    return 'Token123';
                } else if (resource === adalService.config.loginResource) {
                    return 'Token456';
                } else {
                    return '';
                }
            });

        de = fixture.debugElement.query(By.css('.user-login'));
        el = de.nativeElement;

    })

    it('it should have no user before OnInit', function () {
        expect(comp.userInfo).toBeUndefined();
    })

    it('should assign an unauthenticated user', function () {
        fixture.detectChanges();
        expect(comp.userInfo.isAuthenticated).toBe(false);
    })

    it('retrieves a proper token for resource1', function () {
        let token: string = adalService.getCachedToken('resource1');
        expect(spyCachedToken.calls.any()).toBe(true, 'getCachedToken called');
        expect(token).toBe('Token3434');
    });

    it('retrieves a proper token for resource2', function () {
        let token: string = adalService.getCachedToken('resource2');
        expect(spyCachedToken.calls.any()).toBe(true, 'getCachedToken called');
        expect(token).toBe('Token123');
    });

    it('retrieves a proper token for defaultResource', function () {
        let token: string = adalService.getCachedToken('defaultResource');
        expect(spyCachedToken.calls.any()).toBe(true, 'getCachedToken called');
        expect(token).toBe('Token456');
    });

    it('retrieves no token for an unknown resource', function () {
        let token: string = adalService.getCachedToken('resource99');
        expect(spyCachedToken.calls.any()).toBe(true, 'getCachedToken called');
        expect(token).toBe('');
    });
})


class testConfig implements adal.Config {
    clientId: 'e9a5a8b6-8af7-4719-9821-0deef255f68e';
    loginResource: 'defaultResource';
}