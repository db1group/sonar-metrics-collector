import { Company } from '@/domain/Company';
import { Project } from '@/domain/Project';
import { NoProjectError } from '@/domain/health-score/exceptions/InvalidProjectError';
import { CoverageQualityMeasure } from '@/domain/health-score/measures/CoverageQualityMeasure';
import { DuplicatedLinesMeasure } from '@/domain/health-score/measures/DuplicatedLinesMeasure';
import { ManutenabilityMeasure } from '@/domain/health-score/measures/ManutenabilityMeasure';
import { QualityMeasures } from '@/domain/health-score/measures/QualityMeasures';
import { ReliabilityMeasure } from '@/domain/health-score/measures/ReliabilityMeasure';
import { SecurityRatingMeasure } from '@/domain/health-score/measures/SecurityRatingMeasure';
import { SecurityReviewMeasure } from '@/domain/health-score/measures/SecurityReviewMeasure';
import { TechnicalDebt } from '@/domain/technical-debt/TechnicalDebt';

describe('CompanyHealthCalculator', () => {
  describe('constructor', () => {
    it('should throw an error if no projects are provided', () => {
      expect(() => new Company([])).toThrowError(NoProjectError);
    });
  });

  describe('calculateHealthScore', () => {
    it('should return the average health score of all projects with max score', () => {
      const qualityMeasures: QualityMeasures[] = [
        new CoverageQualityMeasure(80),
        new ManutenabilityMeasure(1),
        new ReliabilityMeasure(1),
        new SecurityRatingMeasure(1),
        new SecurityReviewMeasure(1),
        new DuplicatedLinesMeasure(1),
      ];
      const technicalDebt = new TechnicalDebt(60);
      const projects = [new Project(qualityMeasures, technicalDebt)];
      const companyHealthCalculator = new Company(projects);
      expect(companyHealthCalculator.calculateHealthScore()).toEqual(100);
    });

    it('should return the average health score of all projects with min score', () => {
      const qualityMeasures: QualityMeasures[] = [
        new CoverageQualityMeasure(0),
        new ManutenabilityMeasure(5),
        new ReliabilityMeasure(5),
        new SecurityRatingMeasure(5),
        new SecurityReviewMeasure(5),
        new DuplicatedLinesMeasure(11),
      ];
      const technicalDebt = new TechnicalDebt(60);
      const projects = [new Project(qualityMeasures, technicalDebt)];
      const companyHealthCalculator = new Company(projects);
      expect(companyHealthCalculator.calculateHealthScore()).toEqual(0);
    });

    it('should return the average health score of all projects with one measure good score', () => {
      const qualityMeasures: QualityMeasures[] = [
        new CoverageQualityMeasure(80),
        new ManutenabilityMeasure(5),
        new ReliabilityMeasure(5),
        new SecurityRatingMeasure(5),
        new SecurityReviewMeasure(5),
        new DuplicatedLinesMeasure(11),
      ];
      const technicalDebt = new TechnicalDebt(60);
      const projects = [new Project(qualityMeasures, technicalDebt)];
      const companyHealthCalculator = new Company(projects);
      expect(companyHealthCalculator.calculateHealthScore()).toEqual(16.67);
    });
  });
});
