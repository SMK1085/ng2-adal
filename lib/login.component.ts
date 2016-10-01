import { Component, OnInit } from '@angular/core';
import { AdalService, OAuthData } from './adal.service';

@Component({
    selector: 'sg-login',
    template: '<p class="user-login">{{userInfo.userName}}</p>'
})
export class LoginComponent implements OnInit{
    userInfo: OAuthData;

    constructor(private service: AdalService) {
        
    }

    ngOnInit() {
        this.userInfo = this.service.userInfo;
    }

}