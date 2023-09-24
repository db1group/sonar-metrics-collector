import {
  QualityMeasures,
  QualityMeasuresTypes,
} from '../../domain/measures/QualityMeasures';
import { SonarMetricResponse } from './sonar-http-client';
import { ReliabilityMeasure } from '../../domain/measures/ReliabilityMeasure';
import { CoverageQualityMeasure } from '../../domain/measures/CoverageQualityMeasure';
import { ManutenabilityMeasure } from '../../domain/measures/ManutenabilityMeasure';
import { SecurityRatingMeasure } from '../../domain/measures/SecurityRatingMeasure';
import { DuplicatedLinesMeasure } from '../../domain/measures/DuplicatedLinesMeasure';
import { SecurityReviewMeasure } from '../../domain/measures/SecurityReviewMeasure';

export class SonarAdapterMetrics {
  constructor(private readonly sonarResponse: SonarMetricResponse) {}

  execute(): QualityMeasures[] {
    return this.sonarResponse.component.measures.map((measures) => {
      switch (measures.metric) {
        case QualityMeasuresTypes.RELIABILITY_RATING:
          return new ReliabilityMeasure(Number(measures.value));
        case QualityMeasuresTypes.COVERAGE:
          return new CoverageQualityMeasure(Number(measures.value));
        case QualityMeasuresTypes.MANUTENABILITY_RATING:
          return new ManutenabilityMeasure(Number(measures.value));
        case QualityMeasuresTypes.SECURITY_RATING:
          return new SecurityRatingMeasure(Number(measures.value));
        case QualityMeasuresTypes.SECURITY_REVIEW_RATING:
          return new SecurityReviewMeasure(Number(measures.value));
        case QualityMeasuresTypes.DUPLICATED_LINES_DENSITY:
          return new DuplicatedLinesMeasure(Number(measures.value));

        default:
          throw new Error('Invalid metric');
      }
    });
  }
}
