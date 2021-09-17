import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpService } from './services/http.service';

export class AdminGuard implements CanActivate {

    constructor(private http: HttpService, private route: Router ) {
    }
    auth = ''   ;
    backUrl;
    role : string;
    canActivate(route2: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {

        this.role = localStorage.getItem('role');

        if (this.role !== 'admin') {
            return false;
        } 
    }
}
