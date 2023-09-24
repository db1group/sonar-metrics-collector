import {
  CompanyMeasureInput,
  CompanyMeasureUsecase,
} from './usecases/company-measure';

import { QualityProvider } from '../domain/quality-provider';

export class CodeQualityService {
  constructor(private readonly qualityProvider: QualityProvider) {}
  async generateQualityMeasure(keys?: string, keyName?: string): Promise<any> {
    const projectKeys = await this.getProjectKeysByKeyName(keys, keyName);

    const companyMeasureInput: CompanyMeasureInput = {
      projectKeys,
    };

    const companyData = new CompanyMeasureUsecase(
      companyMeasureInput,
      this.qualityProvider,
    );
    return {
      value: await companyData.execute(),
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
