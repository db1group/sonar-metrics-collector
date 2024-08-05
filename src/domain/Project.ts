import { QualityMeasures } from './health-score/measures/QualityMeasures';
import { TechnicalDebt } from './technical-debt/TechnicalDebt';

export class Project {
  constructor(
    private readonly name: string,
    private readonly qualityMeasures: QualityMeasures[],
    private readonly technicalDebt: TechnicalDebt,
  ) { }

  calculateHealthScore(): number {
    return this.qualityMeasures.reduce((acc, qualityMeasure) => {
      return acc + qualityMeasure.getQualityRatio();
    }, 0);
  }

  calculateTechnicalDebt(): number {
    return this.technicalDebt.calculateTechnicalDebt();
  }

  public getName(): string {
    return this.name;
  }
}
