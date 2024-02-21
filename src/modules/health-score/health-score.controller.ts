import { Controller, Get, Inject, Query, ValidationPipe } from '@nestjs/common';
import { CodeQualityService } from '../../application/code-quality.service';
import { QualityMeasureDto } from './quality-measure.dto';
import { ApiTags } from '@nestjs/swagger';
import { AxiosAdapter } from '../../infra/http/axios-adapter';
import { SonarHttpClient } from '../../infra/sonar/sonar-http-client';
import { LOGGER, ILogger } from '@/infra/logger/logger';

@Controller()
export class HealthScoreController {
  constructor(
    @Inject(LOGGER)
    private readonly logger: ILogger,
  ) {}
  @Get()
  @ApiTags('Health Sync - Code Quality')
  generateQualityMeasure(
    @Query(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
        forbidNonWhitelisted: true,
      }),
    )
    query: QualityMeasureDto,
  ): Promise<{
    value: number;
    technicalDebt: number;
    projects: string[];
  }> {
    const sonarUrl = query.sonarUrl || process.env.SONAR_URL;
    this.logger.log(`Sonar URL: ${sonarUrl}`);

    const sonarUserToken = query.sonarUserToken || process.env.SONAR_USER_TOKEN;

    const httpAdapter = new AxiosAdapter(sonarUrl, sonarUserToken);
    const sonarHttpClient = new SonarHttpClient(httpAdapter);
    const codeQualityService = new CodeQualityService(
      sonarHttpClient,
      sonarHttpClient,
    );

    return codeQualityService.generateQualityMeasure(
      query.projectKeys,
      query.projectKeyName,
    );
  }

  @Get('health-check')
  @ApiTags('Health Check')
  healthCheck(): string {
    return 'OK';
  }
}
