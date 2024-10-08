import { QualityMeasuresValues } from '@/domain/health-score/measures/QualityMeasures';
import { SecurityReviewMeasure } from '@/domain/health-score/measures/SecurityReviewMeasure';

describe('SecurityReviewMeasure', () => {
  it('should return the correct quality ratio for a given value', () => {
    const securityReviewMeasure = new SecurityReviewMeasure(1);
    expect(securityReviewMeasure.getQualityRatio()).toBe(
      QualityMeasuresValues.A,
    );
  });

  it('should return the correct quality ratio for a given value', () => {
    const securityReviewMeasure = new SecurityReviewMeasure(2);
    expect(securityReviewMeasure.getQualityRatio()).toBe(
      QualityMeasuresValues.B,
    );
  });

  it('should return the correct quality ratio for a given value', () => {
    const securityReviewMeasure = new SecurityReviewMeasure(3);
    expect(securityReviewMeasure.getQualityRatio()).toBe(
      QualityMeasuresValues.C,
    );
  });

  it('should return the correct quality ratio for a given value', () => {
    const securityReviewMeasure = new SecurityReviewMeasure(4);
    expect(securityReviewMeasure.getQualityRatio()).toBe(
      QualityMeasuresValues.D,
    );
  });

  it('should return the default quality ratio for an invalid value', () => {
    const securityReviewMeasure = new SecurityReviewMeasure(5);
    expect(securityReviewMeasure.getQualityRatio()).toBe(
      QualityMeasuresValues.E,
    );
  });

  it('should return the default quality ratio for an invalid value', () => {
    const securityReviewMeasure = new SecurityReviewMeasure(10);
    expect(securityReviewMeasure.getQualityRatio()).toBe(
      QualityMeasuresValues.E,
    );
  });
});
