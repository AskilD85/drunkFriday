import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/admin/auth.service';

export class GeneralGuard implements CanActivate {

    constructor(private authService: AuthService, private route: Router ) {
    }
    auth = ''   ;
    backUrl;
    isAuth: boolean;
    canActivate(route2: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {

        this.auth = localStorage.getItem('apikey');

        this.authService.checktoken().subscribe(
          (data: boolean) => { this.isAuth = data; console.log( typeof data); },
          err => {console.log(err); }
        );

        if ( this.isAuth === true ) {
            return true;
        } else {
            this.route.navigate(['login']);
            localStorage.setItem('backUrl', state.url);
        }
    }
}
