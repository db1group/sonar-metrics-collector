import { HttpException } from '@nestjs/common';

export class InvalidProjectError extends HttpException {
  constructor() {
    super('Invalid project name or Key', 400);
  }
}
