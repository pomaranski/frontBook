import {ErrorHandler, Injectable, Injector} from '@angular/core';
import {UnauthorizedError} from '../errors/unauthorizedError';
import {Router} from '@angular/router';

@Injectable()
export class AppErrorHandler implements ErrorHandler {

  constructor(private injector: Injector) {
  }

  handleError(error: any): void {
    console.log('Unexpected error');
    console.error(error);

    if (error instanceof UnauthorizedError) {
      this.injector.get(Router).navigate(['/login']);
    }
  }
}
