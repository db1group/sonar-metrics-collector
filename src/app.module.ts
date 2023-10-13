import { Module } from '@nestjs/common';
import { AppController } from './api/app.controller';
import { ConfigModule } from '@nestjs/config';
import { LOGGER } from './infra/logger/logger';
import { ConsoleLogger } from './infra/logger/api-logger';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [
    {
      provide: LOGGER,
      useClass: ConsoleLogger,
    },
  ],
})
export class AppModule {}
