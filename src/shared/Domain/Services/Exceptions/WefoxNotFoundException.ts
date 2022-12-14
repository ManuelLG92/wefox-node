import { HttpException, HttpStatus } from '@nestjs/common';

export class WefoxNotFoundException extends HttpException {
  constructor(message?: string) {
    super(message ?? 'Resource not found', HttpStatus.NOT_FOUND);
  }
}
