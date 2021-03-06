import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UserService } from 'app/apis/services/user.service';

@Injectable()
export class InterceptorService implements HttpInterceptor {
  constructor(private userService: UserService, private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (req.headers.get('noauth')) return next.handle(req.clone());
    else {
      const clonedreq = req.clone({
        headers: req.headers.set(
          'Authorization',
          'Bearer ' + this.userService.getToken()
        ),
      });
      return next.handle(clonedreq).pipe(
        tap(
          (event) => { },
          (err) => {
            this.router.navigateByUrl('/login');
          }
        )
      );
    }
  }
}
