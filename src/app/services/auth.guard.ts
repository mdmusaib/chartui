import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import * as _ from "lodash";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private router: Router) { }

    canActivate(): boolean {
        if (!_.isEmpty(sessionStorage.getItem('token'))) {
            return true;
        } else {
            this.router.navigate(['/login']);
            return false;
        }
    }
    logout() {
        sessionStorage.clear();
    }
}
