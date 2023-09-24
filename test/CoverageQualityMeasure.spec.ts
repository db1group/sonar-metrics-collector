import { CoverageQualityMeasure } from '../src/domain/measures/CoverageQualityMeasure';
import { QualityMeasuresValues } from '../src/domain/measures/QualityMeasures';

describe('CoverageQualityMeasure', () => {
  it('should return A quality ratio for coverage value >= 80', () => {
    const coverageQualityMeasure = new CoverageQualityMeasure(80);
    expect(coverageQualityMeasure.getQualityRatio()).toBe(
      QualityMeasuresValues.A,
    );
  });

  it('should return B quality ratio for coverage value >= 60', () => {
    const coverageQualityMeasure = new CoverageQualityMeasure(60);
    expect(coverageQualityMeasure.getQualityRatio()).toBe(
      QualityMeasuresValues.B,
    );
  });

  it('should return C quality ratio for coverage value >= 40', () => {
    const coverageQualityMeasure = new CoverageQualityMeasure(40);
    expect(coverageQualityMeasure.getQualityRatio()).toBe(
      QualityMeasuresValues.C,
    );
  });

  it('should return D quality ratio for coverage value < 40', () => {
    const coverageQualityMeasure = new CoverageQualityMeasure(30);
    expect(coverageQualityMeasure.getQualityRatio()).toBe(
      QualityMeasuresValues.D,
    );
  });
});
