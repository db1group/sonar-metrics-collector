import {
  QualityMeasures,
  QualityMeasuresTypes,
  QualityMeasuresValues,
} from './QualityMeasures';

export class ReliabilityMeasure implements QualityMeasures {
  public readonly metricName: QualityMeasuresTypes =
    QualityMeasuresTypes.RELIABILITY_RATING;
  constructor(private readonly value: number) {}

  getQualityRatio(): number {
    const ratio = {
      1: QualityMeasuresValues.A,
      2: QualityMeasuresValues.B,
      3: QualityMeasuresValues.C,
      4: QualityMeasuresValues.D,
    };

    return ratio[this.value] || QualityMeasuresValues.D;
  }
}
