import { AuthService } from './admin/auth.service';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpService } from './services/http.service';

export class GeneralGuard implements CanActivate {

    constructor(private http: HttpService,
                private route: Router,
                private auth: AuthService     ) {
    }

    canActivate(route2: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): Observable<boolean> | boolean {

        // проверяю роут на сессию

        if (this.auth.checkToken() !== true) {
            return false;
        }
        return true;
    }
}
