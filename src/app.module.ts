import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { LOGGER } from './infra/logger/logger';
import { ConsoleLogger } from './infra/logger/api-logger';
import { HealthScoreModule } from './modules/health-score/health-score.module';

@Module({
  imports: [ConfigModule.forRoot(), HealthScoreModule],
  controllers: [],
  providers: [
    {
      provide: LOGGER,
      useClass: ConsoleLogger,
    },
  ],
})
export class AppModule {}
