import { QualityMeasures } from '../domain/health-score/measures/QualityMeasures';

export interface QualityProvider {
  getMetricsDataFromProjectKey(projectKey: string): Promise<QualityMeasures[]>;
  getProjectsFromProjectKeyName(projectKeyName: string): Promise<string[]>;
}
