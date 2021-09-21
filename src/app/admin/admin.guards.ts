import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

export class AdminGuard implements CanActivate {

    constructor(private route: Router ) {
    }
    role = ''   ;
    backUrl;
    canActivate(route2: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {

        this.role = localStorage.getItem('role');

        if (this.role === 'admin') {
            return true;
        } else {
            this.route.navigate(['Cabinet', 'profile']);
            localStorage.setItem('backUrl', state.url);

        }
    }
}
