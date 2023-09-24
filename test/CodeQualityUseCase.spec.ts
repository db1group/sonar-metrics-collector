import { CodeQualityService } from '@/aplication/code-quality.service';
import { CoverageQualityMeasure } from '@/domain/measures/CoverageQualityMeasure';
import { QualityProvider } from '@/domain/quality-provider';

describe('CodeQualityService', () => {
  test('Should generate value with project name', async () => {
    const qualityProvider: QualityProvider = {
      getMetricsDataFromProjectKey: () => {
        const coverageMetric = new CoverageQualityMeasure(80);
        return Promise.resolve([coverageMetric]);
      },
      getProjectsFromProjectKeyName: () => {
        return Promise.resolve(['test']);
      },
    };
    const codeQualityService = new CodeQualityService(qualityProvider);

    const qualityMeasures = await codeQualityService.generateQualityMeasure(
      'test',
    );

    expect(qualityMeasures).toEqual({
      value: 16.67,
      projects: ['test'],
    });
  });

  test('Should generate value with project key', async () => {
    const qualityProvider: QualityProvider = {
      getMetricsDataFromProjectKey: () => {
        const coverageMetric = new CoverageQualityMeasure(80);
        return Promise.resolve([coverageMetric]);
      },
      getProjectsFromProjectKeyName: () => {
        return Promise.resolve(['test']);
      },
    };
    const codeQualityService = new CodeQualityService(qualityProvider);

    const qualityMeasures = await codeQualityService.generateQualityMeasure(
      '',
      'test',
    );

    expect(qualityMeasures).toEqual({
      value: 16.67,
      projects: ['test'],
    });
  });

  test('Should generate value with coverage 0', async () => {
    const qualityProvider: QualityProvider = {
      getMetricsDataFromProjectKey: () => {
        const coverageMetric = new CoverageQualityMeasure(0);
        return Promise.resolve([coverageMetric]);
      },
      getProjectsFromProjectKeyName: () => {
        return Promise.resolve(['test']);
      },
    };
    const codeQualityService = new CodeQualityService(qualityProvider);

    const qualityMeasures = await codeQualityService.generateQualityMeasure(
      '',
      'test',
    );

    expect(qualityMeasures).toEqual({
      value: 0,
      projects: ['test'],
    });
  });

  test('Should throw error', async () => {
    const qualityProvider: QualityProvider = {
      getMetricsDataFromProjectKey: () => {
        const coverageMetric = new CoverageQualityMeasure(80);
        return Promise.resolve([coverageMetric]);
      },
      getProjectsFromProjectKeyName: () => {
        return Promise.resolve(['test']);
      },
    };
    const codeQualityService = new CodeQualityService(qualityProvider);

    await expect(() => {
      return codeQualityService.generateQualityMeasure('', '');
    }).rejects.toThrowError('No project keys informed');
  });
});
