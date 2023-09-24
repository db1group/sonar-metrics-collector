import { QualityMeasuresValues } from '@/domain/measures/QualityMeasures';
import { SecurityRatingMeasure } from '@/domain/measures/SecurityRatingMeasure';

describe('SecurityRatingMeasure', () => {
  it('should return the correct quality ratio for a given value', () => {
    const securityRatingMeasure = new SecurityRatingMeasure(2);
    expect(securityRatingMeasure.getQualityRatio()).toBe(
      QualityMeasuresValues.B,
    );
  });

  it('should return the default quality ratio for an invalid value', () => {
    const securityRatingMeasure = new SecurityRatingMeasure(5);
    expect(securityRatingMeasure.getQualityRatio()).toBe(
      QualityMeasuresValues.D,
    );
  });
});
