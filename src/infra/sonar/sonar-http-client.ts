import { HttpClient } from '../http/http-client';
import { QualityMeasures } from '../../domain/measures/QualityMeasures';
import { SonarAdapterMetrics } from './sonar-metrics-adapter';
import { QualityProvider } from '@/domain/quality-provider';

export class SonarHttpClient implements QualityProvider {
  constructor(private readonly httpClient: HttpClient) {}
  getProjectsFromProjectKeyName(projectKeyName: string): Promise<string[]> {
    const request = this.httpClient.get('/api/projects/search', {
      params: {
        q: projectKeyName,
      },
    });

    return request.then((data: SonarProjectKeyNameResponse) => {
      console.log(data);
      return data.components.map((project) => project.key);
    });
  }
  async getMetricsDataFromProjectKey(
    projectKey: string,
  ): Promise<QualityMeasures[]> {
    const request = this.httpClient.get('/api/measures/component', {
      params: {
        component: projectKey,
        metricKeys:
          'reliability_rating,sqale_rating, security_rating, security_review_rating, coverage, duplicated_lines_density',
      },
    });

    return request.then((data: SonarMetricResponse) => {
      if (data.component.measures.length) {
        return new SonarAdapterMetrics(data).execute();
      }
    });
  }
}

export interface SonarMetricResponse {
  component: {
    key: string;
    name: string;
    qualifier: string;
    measures: {
      metric: string;
      value: string;
      bestValue: boolean;
    }[];
  };
}
export interface SonarProjectKeyNameResponse {
  components: {
    key: string;
    name: string;
    qualifier: string;
    visibility: string;
    lastAnalysisDate: string;
    revision: string;
  }[];
}
