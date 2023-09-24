import { QualityMeasuresValues } from '@/domain/measures/QualityMeasures';
import { ReliabilityMeasure } from '@/domain/measures/ReliabilityMeasure';

describe('ReliabilityMeasure', () => {
  it('should return the correct quality ratio for a given value', () => {
    const reliabilityMeasure = new ReliabilityMeasure(1);
    expect(reliabilityMeasure.getQualityRatio()).toBe(QualityMeasuresValues.A);
  });
  it('should return the correct quality ratio for a given value', () => {
    const reliabilityMeasure = new ReliabilityMeasure(2);
    expect(reliabilityMeasure.getQualityRatio()).toBe(QualityMeasuresValues.B);
  });

  it('should return the correct quality ratio for a given value', () => {
    const reliabilityMeasure = new ReliabilityMeasure(3);
    expect(reliabilityMeasure.getQualityRatio()).toBe(QualityMeasuresValues.C);
  });

  it('should return the default quality ratio for a given value', () => {
    const reliabilityMeasure = new ReliabilityMeasure(4);
    expect(reliabilityMeasure.getQualityRatio()).toBe(QualityMeasuresValues.D);
  });

  it('should return the default quality ratio for a negative value', () => {
    const reliabilityMeasure = new ReliabilityMeasure(5);
    expect(reliabilityMeasure.getQualityRatio()).toBe(QualityMeasuresValues.E);
  });

  it('should return the default quality ratio for a negative value', () => {
    const reliabilityMeasure = new ReliabilityMeasure(10);
    expect(reliabilityMeasure.getQualityRatio()).toBe(QualityMeasuresValues.E);
  });
});
