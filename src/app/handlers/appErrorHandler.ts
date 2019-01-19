import {ErrorHandler, Injectable, Injector, NgZone} from '@angular/core';
import {UnauthorizedError} from '../errors/unauthorizedError';
import {Router} from '@angular/router';

@Injectable()
export class AppErrorHandler implements ErrorHandler {

  constructor(private injector: Injector) {
  }

  handleError(error: any): void {
    console.error(error);

    if (error instanceof UnauthorizedError) {
      const ngZone = this.injector.get(NgZone);
      ngZone.run(() => this.injector.get(Router).navigateByUrl('/').then());
    }
  }
}
