import {ErrorHandler} from '@angular/core';
import {UnauthorizedError} from '../errors/unauthorizedError';

export class AppErrorHandler implements ErrorHandler{

  handleError(error: any): void {
    console.log('Unexpected error');
    console.error(error);

    if (error instanceof UnauthorizedError) {
      window.location.href = '/login';
    }
  }
}
