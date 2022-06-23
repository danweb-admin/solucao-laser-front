import { Injectable } from '@angular/core';
import { 
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest, HttpErrorResponse, HttpResponse }
from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, finalize, retryWhen, tap} from 'rxjs/operators';
import { Router } from '@angular/router';
import { routes } from 'src/app/consts';
import { ToastrService } from 'ngx-toastr';
import { SpinnerService } from '../services/spinner.service';



@Injectable()
export class Interceptor implements HttpInterceptor {

  public routers: typeof routes = routes;
  urlIsLogin = '';
  constructor(private router: Router,
              private toastr: ToastrService,
              private spinnerService: SpinnerService){

  }
 intercept( request: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>> {
    
    this.spinnerService.show();
    this.urlIsLogin = 'api/v1/login';
    let urlIsApiIBGE = 'https://servicodados.ibge.gov.br/api/v1/localidades'; 
    
    if (!request.url.match(this.urlIsLogin) && !request.url.match(urlIsApiIBGE)){
      let token = localStorage.getItem('token');
      request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}` 
          }
      });
    }
  
    return next.handle(request).pipe(
      finalize(() => this.spinnerService.hide()),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 404 && error.url.match(this.urlIsLogin)){
          this.toastr.error(error.error.message);
        }else if (error.status === 504 && error.url.match(this.urlIsLogin)){
          this.toastr.error('Houve erro de comunicação com o servidor! Contate o administrador!');
        }else if (error.status === 504){
          // this.router.navigate([this.routers.LOGIN]).then();
          // this.toastr.error('Faça o login novamente');
          console.log(error);
          this.toastr.error('erro!');
        }else if (error.status === 500){
          this.toastr.error('Houve erro de comunicação com o servidor! Contate o administrador!');
        }else if (error.status === 401 || error.status === 403 || error.status === 0) {
          this.router.navigate([this.routers.LOGIN]).then();
          this.toastr.error('Faça o login novamente');
          console.log(error);
           this.removeDialog();
        }
        // this.spinnerService.hide();
        return throwError(error);
      })
    );
  }

  removeDialog(): void{
    let element = document.getElementsByClassName("cdk-overlay-container") as HTMLCollection;
    if (element.length > 0)
      element[0].remove();
  }
}