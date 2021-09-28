import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from './admin/auth.service';
import { HttpService } from './services/http.service';

export class GeneralGuard implements CanActivate {

    constructor(private http: HttpService, private route: Router, private authService: AuthService ) {
    }
    auth = ''   ;
    backUrl;
    count = 0;
    canActivate(route2: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {

        this.auth = localStorage.getItem('apikey');

        this.authService.checkToken().subscribe(
            (data)=>{ 
                if (data['result'] === 'OK') {
                    console.log('true');
                    
                    return of(true);
                }
                if (data['result'] === 'error') {
                       console.log('логаут');
                       this.authService.logout();   
                       this.route.navigate(['login']);
                       localStorage.setItem('backUrl', state.url);  
                       return of(false); 
                }
             }
        );
       return;
    }
}
