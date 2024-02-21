import {
  CompanyMeasureInput,
  CompanyMeasureUsecase,
} from './usecases/company-measure';

import { QualityProvider } from './quality-provider';
import { TechnicalDebtProvider } from './technical-debt-provider';

export class CodeQualityService {
  constructor(
    private readonly qualityProvider: QualityProvider,
    private readonly technicalDebtProvider: TechnicalDebtProvider,
  ) {}
  async generateQualityMeasure(
    keys?: string,
    keyName?: string,
  ): Promise<{
    value: number;
    technicalDebt: number;
    projects: string[];
  }> {
    const projectKeys = await this.getProjectKeysByKeyName(keys, keyName);

    const companyMeasureInput: CompanyMeasureInput = {
      projectKeys,
    };

    const companyData = new CompanyMeasureUsecase(
      companyMeasureInput,
      this.qualityProvider,
      this.technicalDebtProvider,
    );
    const { healthScore, technicalDebt } = await companyData.execute();
    return {
      value: healthScore,
      technicalDebt,
      projects: projectKeys,
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
