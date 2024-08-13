import { HttpClient } from '../http/http-client';
import {
  QualityMeasures,
  TECHICAL_DEBT,
} from '../../domain/health-score/measures/QualityMeasures';

import { QualityProvider } from '@/application/quality-provider';
import { SonarMetricsAdapter } from './sonar-metrics-adapter';
import { TechnicalDebtProvider } from '@/application/technical-debt-provider';
import { TechnicalDebt } from '@/domain/technical-debt/TechnicalDebt';
import { SonarTechicalDebtAdapter } from './sonar-techical-debt-adapter';

export class SonarHttpClient implements QualityProvider, TechnicalDebtProvider {
  constructor(private readonly httpClient: HttpClient) {}
  getTechnicalDebtFromProject(project: string): Promise<TechnicalDebt> {
    const request = this.httpClient.get('/api/measures/component', {
      params: {
        component: project,
        metricKeys: TECHICAL_DEBT,
      },
    });

    return request.then((data: SonarMetricResponse) => {
      if (data.component.measures.length) {
        return new SonarTechicalDebtAdapter(data).execute();
      }
    });
  }
  getProjectsFromProjectKeyName(projectKeyName: string): Promise<string[]> {
    const request = this.httpClient.get('/api/projects/search', {
      params: {
        q: projectKeyName,
      },
    });

    return request.then((data: SonarProjectKeyNameResponse) => {
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
        return new SonarMetricsAdapter(data).execute();
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
