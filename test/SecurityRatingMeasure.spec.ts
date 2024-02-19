import { QualityMeasuresValues } from '@/domain/health-score/measures/QualityMeasures';
import { SecurityRatingMeasure } from '@/domain/health-score/measures/SecurityRatingMeasure';

describe('SecurityRatingMeasure', () => {
  it('should return the correct quality ratio for a given value', () => {
    const securityRatingMeasure = new SecurityRatingMeasure(1);
    expect(securityRatingMeasure.getQualityRatio()).toBe(
      QualityMeasuresValues.A,
    );
  });

  it('should return the correct quality ratio for a given value', () => {
    const securityRatingMeasure = new SecurityRatingMeasure(2);
    expect(securityRatingMeasure.getQualityRatio()).toBe(
      QualityMeasuresValues.B,
    );
  });

  it('should return the correct quality ratio for a given value', () => {
    const securityRatingMeasure = new SecurityRatingMeasure(3);
    expect(securityRatingMeasure.getQualityRatio()).toBe(
      QualityMeasuresValues.C,
    );
  });

  it('should return the correct quality ratio for a given value', () => {
    const securityRatingMeasure = new SecurityRatingMeasure(4);
    expect(securityRatingMeasure.getQualityRatio()).toBe(
      QualityMeasuresValues.D,
    );
  });

  it('should return the default quality ratio for an invalid value', () => {
    const securityRatingMeasure = new SecurityRatingMeasure(5);
    expect(securityRatingMeasure.getQualityRatio()).toBe(
      QualityMeasuresValues.E,
    );
  });

  it('should return the default quality ratio for an invalid value', () => {
    const securityRatingMeasure = new SecurityRatingMeasure(10);
    expect(securityRatingMeasure.getQualityRatio()).toBe(
      QualityMeasuresValues.E,
    );
  });
});
