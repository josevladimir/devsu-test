import { HttpEvent, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, filter, finalize, map, take, throwError } from 'rxjs';
import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService {

  private generalService: GeneralService = inject(GeneralService);

  intercept(req : HttpRequest<any>, next : HttpHandler) : Observable<HttpEvent<any>> {
    
    req.headers.append('Content-Type','application/json');
    
    return next.handle(req).pipe(
      filter((response: any) => response instanceof HttpResponse),
      take(1),
      catchError(error => {
        switch(error.status){
          case 400:
            this.generalService.showErrorToast('Ha ocurrido un error, por favor reintente.');
            break;
          case 404:
            this.generalService.showErrorToast('No se ha encontrado el producto.');
            break;
          default:
            break;
        }
        return throwError(()=> ({status: error.status, message: error.message}));
      }),
      finalize(() => { this.generalService.stopLoading(); })
    );

  }

}
