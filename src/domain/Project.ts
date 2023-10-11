import { QualityMeasures } from './measures/QualityMeasures';

export class Project {
  constructor(private readonly qualityMeasures: QualityMeasures[]) {}

  calculateHealthScore(): number {
    return this.qualityMeasures.reduce((acc, qualityMeasure) => {
      return acc + qualityMeasure.getQualityRatio();
    }, 0);
  }
}
