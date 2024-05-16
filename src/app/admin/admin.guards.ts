import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
@Injectable()
export class AdminGuard implements CanActivate {

    constructor(private route: Router ) {
    }
    public role = '';
    public backUrl;
    public canActivate(route2: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {

        this.role = localStorage.getItem('role');

        if (this.role === 'admin') {
            return true;
        } else {
            this.route.navigate(['Cabinet', 'profile']);
            localStorage.setItem('backUrl', state.url);

        }
    }
}
