import { TechnicalDebt } from '@/domain/technical-debt/TechnicalDebt';

describe('TechnicalDebt', () => {
  it('should return correct technical debt in hours for a given value', () => {
    const technicalDebt = new TechnicalDebt(120);
    expect(technicalDebt.calculateTechnicalDebt()).toBe(2);
  });

  it('should return 0 if the value is 0', () => {
    const technicalDebt = new TechnicalDebt(0);
    expect(technicalDebt.calculateTechnicalDebt()).toBe(0);
  });

  it('should handle large values correctly', () => {
    const technicalDebt = new TechnicalDebt(6000);
    expect(technicalDebt.calculateTechnicalDebt()).toBe(100);
  });

  it('should return fractional hours for values not divisible by 60', () => {
    const technicalDebt = new TechnicalDebt(90);
    expect(technicalDebt.calculateTechnicalDebt()).toBe(1.5);
  });
});
