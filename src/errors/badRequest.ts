export class BadRequest {
  constructor(message: string) {
    return { message, status: 400 };
  }
}
