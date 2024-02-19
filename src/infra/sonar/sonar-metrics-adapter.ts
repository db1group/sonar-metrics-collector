import {
  QualityMeasures,
  QualityMeasuresTypes,
} from '../../domain/health-score/measures/QualityMeasures';
import { SonarMetricResponse } from './sonar-http-client';
import { ReliabilityMeasure } from '../../domain/health-score/measures/ReliabilityMeasure';
import { CoverageQualityMeasure } from '../../domain/health-score/measures/CoverageQualityMeasure';
import { ManutenabilityMeasure } from '../../domain/health-score/measures/ManutenabilityMeasure';
import { SecurityRatingMeasure } from '../../domain/health-score/measures/SecurityRatingMeasure';
import { DuplicatedLinesMeasure } from '../../domain/health-score/measures/DuplicatedLinesMeasure';
import { SecurityReviewMeasure } from '../../domain/health-score/measures/SecurityReviewMeasure';

export class SonarAdapterMetrics {
  constructor(private readonly sonarResponse: SonarMetricResponse) {}
  execute(): QualityMeasures[] {
    const healthPanelMetrics = Object.values(QualityMeasuresTypes);
    const sonarMeasures = this.sonarResponse.component.measures;

    return healthPanelMetrics.map((metric: QualityMeasuresTypes) => {
      const metricFound = sonarMeasures.find(
        (sonarMeasure) => sonarMeasure.metric === metric,
      );
      if (metricFound) {
        return this.getMeasureByMetric(metric, Number(metricFound.value));
      }
      return this.getMeasureByMetric(metric, 0);
    });
  }

  private getMeasureByMetric(
    metricFound: QualityMeasuresTypes,
    value: number,
  ): QualityMeasures {
    switch (metricFound) {
      case QualityMeasuresTypes.RELIABILITY_RATING:
        return new ReliabilityMeasure(value);
      case QualityMeasuresTypes.COVERAGE:
        return new CoverageQualityMeasure(value);
      case QualityMeasuresTypes.MANUTENABILITY_RATING:
        return new ManutenabilityMeasure(value);
      case QualityMeasuresTypes.SECURITY_RATING:
        return new SecurityRatingMeasure(value);
      case QualityMeasuresTypes.SECURITY_REVIEW_RATING:
        return new SecurityReviewMeasure(value);
      case QualityMeasuresTypes.DUPLICATED_LINES_DENSITY:
        return new DuplicatedLinesMeasure(value);
    }
  }
}
