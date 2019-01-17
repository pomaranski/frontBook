import {AppError} from './AppError';

export class UnauthorizedError extends AppError {
  constructor(error?: any) {
    super(error);
  }
}
