import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AppState } from '../../app.reducers';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptorService implements HttpInterceptor {
  private access_token: string = '';

  constructor(
    private store: Store<AppState>,
    private spinnerService: SharedService
  ) {
    this.store.select('auth').subscribe((auth) => {
      this.access_token = '';
      if (auth.credentials.access_token) {
        this.access_token = auth.credentials.access_token;
      }
    });
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log('START API CALL');
    this.spinnerService.show();

    if (this.access_token) {
      req = req.clone({
        setHeaders: {
          'Content-Type': 'application/json; charset=utf-8',
          Accept: 'application/json',
          Authorization: `Bearer ${this.access_token}`,
        },
      });
    }

    return next.handle(req).pipe(
      finalize(() => {
        console.log('FINISH API CALL');
        this.spinnerService.hide();
      })
    );
  }
}
