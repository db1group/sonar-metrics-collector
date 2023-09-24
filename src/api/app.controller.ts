import { Controller, Get, Query, ValidationPipe } from '@nestjs/common';
import { CodeQualityService } from '../application/code-quality.service';
import { QualityMeasureDto } from './quality-measure.dto';
import { ApiTags } from '@nestjs/swagger';
import { AxiosAdapter } from '../infra/http/axios-adapter';
import { SonarHttpClient } from '../infra/sonar/sonar-http-client';

@Controller()
export class AppController {
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
  ): Promise<number> {
    const sonarUrl = query.sonarUrl || process.env.SONAR_URL;
    const sonarUserToken = query.sonarUserToken || process.env.SONAR_USER_TOKEN;
    const httpAdapter = new AxiosAdapter(sonarUrl, sonarUserToken);
    const sonarHttpClient = new SonarHttpClient(httpAdapter);
    const codeQualityService = new CodeQualityService(sonarHttpClient);

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
