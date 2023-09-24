import {
  QualityMeasures,
  QualityMeasuresTypes,
  QualityMeasuresValues,
} from './QualityMeasures';

export class CoverageQualityMeasure implements QualityMeasures {
  public readonly metricName: QualityMeasuresTypes =
    QualityMeasuresTypes.COVERAGE;

  constructor(private readonly coverageValue: number) {}

  getQualityRatio(): number {
    return this.getQualityRatioByValue();
  }

  private getQualityRatioByValue(): number {
    if (this.coverageValue >= 80) {
      return QualityMeasuresValues.A;
    }

    if (this.coverageValue >= 60) {
      return QualityMeasuresValues.B;
    }

    if (this.coverageValue >= 40) {
      return QualityMeasuresValues.C;
    }

    if (this.coverageValue > 0) {
      return QualityMeasuresValues.D;
    }

    return QualityMeasuresValues.E;
  }
}
