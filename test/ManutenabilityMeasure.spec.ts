import { ManutenabilityMeasure } from '@/domain/measures/ManutenabilityMeasure';
import { QualityMeasuresValues } from '@/domain/measures/QualityMeasures';

describe('ManutenabilityMeasure', () => {
  it('should return A quality ratio for value 1', () => {
    const manutenabilityMeasure = new ManutenabilityMeasure(1);
    expect(manutenabilityMeasure.getQualityRatio()).toBe(
      QualityMeasuresValues.A,
    );
  });

  it('should return B quality ratio for value 2', () => {
    const manutenabilityMeasure = new ManutenabilityMeasure(2);
    expect(manutenabilityMeasure.getQualityRatio()).toBe(
      QualityMeasuresValues.B,
    );
  });

  it('should return C quality ratio for value 3', () => {
    const manutenabilityMeasure = new ManutenabilityMeasure(3);
    expect(manutenabilityMeasure.getQualityRatio()).toBe(
      QualityMeasuresValues.C,
    );
  });

  it('should return D quality ratio for value 4 or greater', () => {
    const manutenabilityMeasure = new ManutenabilityMeasure(4);
    expect(manutenabilityMeasure.getQualityRatio()).toBe(
      QualityMeasuresValues.D,
    );
    const manutenabilityMeasure2 = new ManutenabilityMeasure(5);
    expect(manutenabilityMeasure2.getQualityRatio()).toBe(
      QualityMeasuresValues.D,
    );
  });
});
