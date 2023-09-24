import { Project } from '../../domain/Project';
import { CompanyHealthScore } from '../../domain/CompanyHealthScore';
import { QualityProvider } from 'src/domain/quality-provider';

export class CompanyMeasureUsecase {
  constructor(
    private readonly input: CompanyMeasureInput,
    private readonly qualityProviderService: QualityProvider,
  ) {}

  async execute(): Promise<any> {
    const { projectKeys } = this.input;
    const projects = await this.getProjects(projectKeys);
    const companyHealthScore = new CompanyHealthScore(projects);
    return companyHealthScore.getHealthScore();
  }

  private async getProjects(projectKeys: string[]): Promise<Project[]> {
    const projects = await Promise.all(
      projectKeys.map(async (projectKey: string) => {
        const qualityMeasures =
          await this.qualityProviderService.getMetricsDataFromProjectKey(
            projectKey,
          );
        if (qualityMeasures) {
          return new Project(qualityMeasures);
        }
      }),
    );
    return projects.filter((project) => project);
  }
}

export type CompanyMeasureInput = {
  projectKeys: string[];
};
