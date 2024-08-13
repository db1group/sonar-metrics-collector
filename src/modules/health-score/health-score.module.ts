import { ConsoleLogger, Module } from '@nestjs/common';
import { HealthScoreController } from './health-score.controller';
import { LOGGER } from '@/infra/logger/logger';

@Module({
  imports: [],
  controllers: [HealthScoreController],
  providers: [
    {
      provide: LOGGER,
      useClass: ConsoleLogger,
    },
  ],
})
export class HealthScoreModule {}
