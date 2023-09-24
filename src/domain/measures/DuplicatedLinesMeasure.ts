import {
  QualityMeasures,
  QualityMeasuresTypes,
  QualityMeasuresValues,
} from './QualityMeasures';

export class DuplicatedLinesMeasure implements QualityMeasures {
  public readonly metricName: QualityMeasuresTypes =
    QualityMeasuresTypes.DUPLICATED_LINES_DENSITY;
  constructor(private readonly value: number) {}

  getQualityRatio(): number {
    if (this.value <= 5) {
      return QualityMeasuresValues.A;
    }
    if (this.value <= 8) {
      return QualityMeasuresValues.B;
    }
    if (this.value <= 10) {
      return QualityMeasuresValues.C;
    }
    return QualityMeasuresValues.D;
  }
}
