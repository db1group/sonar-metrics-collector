import { QualityMeasuresValues } from '@/domain/measures/QualityMeasures';
import { SecurityReviewMeasure } from '@/domain/measures/SecurityReviewMeasure';

describe('SecurityReviewMeasure', () => {
  it('should return the correct quality ratio for a given value', () => {
    const securityReviewMeasure = new SecurityReviewMeasure(2);
    expect(securityReviewMeasure.getQualityRatio()).toBe(
      QualityMeasuresValues.B,
    );
  });

  it('should return the default quality ratio for an invalid value', () => {
    const securityReviewMeasure = new SecurityReviewMeasure(5);
    expect(securityReviewMeasure.getQualityRatio()).toBe(
      QualityMeasuresValues.D,
    );
  });
});
