import { QualityMeasuresValues } from '@/domain/measures/QualityMeasures';
import { ReliabilityMeasure } from '@/domain/measures/ReliabilityMeasure';

describe('ReliabilityMeasure', () => {
  it('should return the correct quality ratio for a given value', () => {
    const reliabilityMeasure = new ReliabilityMeasure(2);
    expect(reliabilityMeasure.getQualityRatio()).toBe(QualityMeasuresValues.B);
  });

  it('should return the default quality ratio for an invalid value', () => {
    const reliabilityMeasure = new ReliabilityMeasure(5);
    expect(reliabilityMeasure.getQualityRatio()).toBe(QualityMeasuresValues.D);
  });
});
