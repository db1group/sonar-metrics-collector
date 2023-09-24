import { DuplicatedLinesMeasure } from '@/domain/measures/DuplicatedLinesMeasure';
import { QualityMeasuresValues } from '@/domain/measures/QualityMeasures';

describe('DuplicatedLinesMeasure', () => {
  it('should return A quality ratio for value <= 5', () => {
    const duplicatedLinesMeasure = new DuplicatedLinesMeasure(5);
    expect(duplicatedLinesMeasure.getQualityRatio()).toBe(
      QualityMeasuresValues.A,
    );
  });

  it('should return B quality ratio for value <= 8', () => {
    const duplicatedLinesMeasure = new DuplicatedLinesMeasure(8);
    expect(duplicatedLinesMeasure.getQualityRatio()).toBe(
      QualityMeasuresValues.B,
    );
  });

  it('should return C quality ratio for value <= 10', () => {
    const duplicatedLinesMeasure = new DuplicatedLinesMeasure(10);
    expect(duplicatedLinesMeasure.getQualityRatio()).toBe(
      QualityMeasuresValues.C,
    );
  });

  it('should return D quality ratio for value > 10', () => {
    const duplicatedLinesMeasure = new DuplicatedLinesMeasure(15);
    expect(duplicatedLinesMeasure.getQualityRatio()).toBe(
      QualityMeasuresValues.D,
    );
  });
});
