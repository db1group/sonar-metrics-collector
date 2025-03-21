import { CodeQualityService } from '@/application/code-quality.service';
import { QualityProvider } from '@/application/quality-provider';
import { TechnicalDebtProvider } from '@/application/technical-debt-provider';
import { CoverageQualityMeasure } from '@/domain/health-score/measures/CoverageQualityMeasure';
import { TechnicalDebt } from '@/domain/technical-debt/TechnicalDebt';

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

    const tehcDebtProvider: TechnicalDebtProvider = {
      getTechnicalDebtFromProject(): Promise<TechnicalDebt> {
        return Promise.resolve(new TechnicalDebt(60));
      },
    };

    const codeQualityService = new CodeQualityService(
      qualityProvider,
      tehcDebtProvider,
    );

    const qualityMeasures = await codeQualityService.generateQualityMeasure(
      'test',
    );

    expect(qualityMeasures.items).toHaveLength(1);
    const item = qualityMeasures.items[0];
    expect(item.value).toBeCloseTo(16.67);
    expect(item.technicalDebt).toBe(1);
    expect(item.project).toBe('test');
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

    const tehcDebtProvider: TechnicalDebtProvider = {
      getTechnicalDebtFromProject(): Promise<TechnicalDebt> {
        return Promise.resolve(new TechnicalDebt(60));
      },
    };

    const codeQualityService = new CodeQualityService(
      qualityProvider,
      tehcDebtProvider,
    );

    const qualityMeasures = await codeQualityService.generateQualityMeasure(
      '',
      'test',
    );

    expect(qualityMeasures.items).toHaveLength(1);
    const item = qualityMeasures.items[0];
    expect(item.value).toBeCloseTo(16.67);
    expect(item.technicalDebt).toBe(1);
    expect(item.project).toBe('test');
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

    const tehcDebtProvider: TechnicalDebtProvider = {
      getTechnicalDebtFromProject(): Promise<TechnicalDebt> {
        return Promise.resolve(new TechnicalDebt(120));
      },
    };
    const codeQualityService = new CodeQualityService(
      qualityProvider,
      tehcDebtProvider,
    );

    const qualityMeasures = await codeQualityService.generateQualityMeasure(
      '',
      'test',
    );

    expect(qualityMeasures.items).toHaveLength(1);
    const item = qualityMeasures.items[0];
    expect(item.value).toBeCloseTo(0);
    expect(item.technicalDebt).toBe(2);
    expect(item.project).toBe('test');
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

    const tehcDebtProvider: TechnicalDebtProvider = {
      getTechnicalDebtFromProject(): Promise<TechnicalDebt> {
        return Promise.resolve(new TechnicalDebt(60));
      },
    };

    const codeQualityService = new CodeQualityService(
      qualityProvider,
      tehcDebtProvider,
    );

    await expect(() => {
      return codeQualityService.generateQualityMeasure('', '');
    }).rejects.toThrowError('No project keys informed');
  });
});
