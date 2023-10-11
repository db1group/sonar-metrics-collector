import { HttpException } from '@nestjs/common';

export class NoProjectError extends HttpException {
  constructor() {
    super('Invalid project name or Key', 400);
  }
}
