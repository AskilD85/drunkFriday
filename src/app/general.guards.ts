import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpService } from './services/http.service';

export class GeneralGuard implements CanActivate {

    constructor(private http: HttpService, private route: Router ) {
    }
    auth = ''   ;
    backUrl;
    canActivate(route2: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {

        this.auth = localStorage.getItem('apikey');

        if (this.auth) {
            return true;
        } else {
            this.route.navigate(['/Admin/login']);
            localStorage.setItem('backUrl', state.url);

        }
    }
}
