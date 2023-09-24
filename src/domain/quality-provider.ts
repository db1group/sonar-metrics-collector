import { QualityMeasures } from './measures/QualityMeasures';

export interface QualityProvider {
  getMetricsDataFromProjectKey(projectKey: string): Promise<QualityMeasures[]>;
  getProjectsFromProjectKeyName(projectKeyName: string): Promise<string[]>;
}
