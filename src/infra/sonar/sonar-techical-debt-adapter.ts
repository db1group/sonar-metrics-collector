import { TECHICAL_DEBT } from '../../domain/health-score/measures/QualityMeasures';
import { SonarMetricResponse } from './sonar-http-client';

import { TechnicalDebt } from '@/domain/technical-debt/TechnicalDebt';

export class SonarTechicalDebtAdapter {
  constructor(private readonly sonarResponse: SonarMetricResponse) {}
  execute(): TechnicalDebt {
    const sonarMeasures = this.sonarResponse.component.measures;

    const technicalDebtValue = sonarMeasures.find(
      (sonarMeasure) => sonarMeasure.metric === TECHICAL_DEBT,
    );

    return new TechnicalDebt(Number(technicalDebtValue.value));
  }
}
