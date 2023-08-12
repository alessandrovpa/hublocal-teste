export class AppError extends Error {
  private status: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.message = message;
    this.status = statusCode;
  }

  get statusCode() {
    return this.status;
  }
}
