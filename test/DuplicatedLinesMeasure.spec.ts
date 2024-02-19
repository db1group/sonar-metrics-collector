import { DuplicatedLinesMeasure } from '@/domain/health-score/measures/DuplicatedLinesMeasure';
import { QualityMeasuresValues } from '@/domain/health-score/measures/QualityMeasures';

describe('DuplicatedLinesMeasure', () => {
  describe('getQualityRatio', () => {
    it('should return A for a value of 3 or less', () => {
      const measure = new DuplicatedLinesMeasure(3);
      expect(measure.getQualityRatio()).toBe(QualityMeasuresValues.A);
    });

    it('should return B for a value between 3 and 5', () => {
      const measure = new DuplicatedLinesMeasure(4);
      expect(measure.getQualityRatio()).toBe(QualityMeasuresValues.B);
    });

    it('should return C for a value between 5 and 7', () => {
      const measure = new DuplicatedLinesMeasure(6);
      expect(measure.getQualityRatio()).toBe(QualityMeasuresValues.C);
    });

    it('should return D for a value between 7 and 10', () => {
      const measure = new DuplicatedLinesMeasure(8);
      expect(measure.getQualityRatio()).toBe(QualityMeasuresValues.D);
    });

    it('should return E for a value greater than 10', () => {
      const measure = new DuplicatedLinesMeasure(11);
      expect(measure.getQualityRatio()).toBe(QualityMeasuresValues.E);
    });
  });
});
