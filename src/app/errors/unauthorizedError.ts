import {AppError} from './appError';

export class UnauthorizedError extends AppError {
  constructor(error?: any) {
    super(error);
  }
}
