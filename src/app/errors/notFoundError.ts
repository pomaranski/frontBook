import {AppError} from './appError';

export class NotFoundError extends AppError {
  constructor(error?: any) {
    super(error);
  }
}
