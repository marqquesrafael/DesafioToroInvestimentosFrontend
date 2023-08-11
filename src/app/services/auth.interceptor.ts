import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, catchError, throwError } from "rxjs";
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

constructor(private router: Router, private toastr: ToastrService){}

intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('authToken');

    if(token){
        req = req.clone({
            setHeaders: { Authorization: token}
        })
    }

    return next.handle(req)
    .pipe(
        catchError((error: HttpErrorResponse) => {
            let errorMsg = '';
            if (error.status === 401) {
                this.toastr.warning('Tempo de sessão expirado!', 'Realize o login novamente');
                localStorage.clear();
                this.router.navigate(['login'])
            } 
            else if(error.status === 400){
                errorMsg = `Error Code: ${error.status},  Message: ${error.error}`;
                console.log(error)
            }
            else {
                errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
                console.log(error)
            }

            return throwError(error);
        })
    )
}
}