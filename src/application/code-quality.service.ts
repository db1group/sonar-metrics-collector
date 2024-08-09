import {
  CompanyMeasureInput,
  CompanyMeasureUsecase,
} from './usecases/company-measure';

import { QualityProvider } from './quality-provider';
import { TechnicalDebtProvider } from './technical-debt-provider';
import { QualityMeasureResultDto } from '@/modules/health-score/quality-measure-result.dto';

export class CodeQualityService {
  constructor(
    private readonly qualityProvider: QualityProvider,
    private readonly technicalDebtProvider: TechnicalDebtProvider,
  ) { }
  async generateQualityMeasure(
    keys?: string,
    keyName?: string,
  ): Promise<QualityMeasureResultDto> {
    const projectKeys = await this.getProjectKeysByKeyName(keys, keyName);

    const companyMeasureInput: CompanyMeasureInput = {
      projectKeys,
    };

    const companyData = new CompanyMeasureUsecase(
      companyMeasureInput,
      this.qualityProvider,
      this.technicalDebtProvider,
    );

    const healthScore = await companyData.execute();

    return {
      value: healthScore.value,
      technicalDebt: healthScore.technicalDebt,
      items: healthScore.items.map((item) => {
        return {
          project: item.project,
          technicalDebt: item.technicalDebt,
          value: item.value,
        };
      })
    };
  }

  private async getProjectKeysByKeyName(
    keys?: string,
    keyName?: string,
  ): Promise<string[]> {
    if (keys) return keys.split(',').map((key) => key.trim());
    if (keyName) {
      return this.qualityProvider.getProjectsFromProjectKeyName(keyName);
    }
    throw new Error('No project keys informed');
  }
}
