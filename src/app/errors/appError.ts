export class AppError {
  public error: any;
  constructor(obj?: any) {
    this.error = obj.error.error;
  }
}
