import { HttpService } from './../services/http.service';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../admin/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private http: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available

        const token = localStorage.getItem('apikey');

        if (token) {

            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
        } else {
            console.log('хуй');
        }

        return next.handle(request);
    }
}


