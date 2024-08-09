import { Company } from '@/domain/Company';
import { QualityProvider } from '../quality-provider';
import { TechnicalDebtProvider } from '../technical-debt-provider';
import { Project } from '@/domain/Project';
import { HealthScore } from '@/domain/HealthScore';

export class CompanyMeasureUsecase {
  constructor(
    private readonly input: CompanyMeasureInput,
    private readonly qualityProviderService: QualityProvider,
    private readonly tecnicalDebtService: TechnicalDebtProvider,
  ) {}

  async execute(): Promise<HealthScore> {
    const { projectKeys } = this.input;
    const projects = await this.getProjects(projectKeys);
    const company = new Company(projects);
    const healthScore = company.calculateHealthScore();

    return healthScore;
  }

  private async getProjects(projectKeys: string[]): Promise<Project[]> {
    const projects = await Promise.all(
      projectKeys.map(async (projectKey: string) => {
        const qualityMeasures =
          await this.qualityProviderService.getMetricsDataFromProjectKey(
            projectKey,
          );
        if (qualityMeasures) {
          const technicalDebt =
            await this.tecnicalDebtService.getTechnicalDebtFromProject(
              projectKey,
            );
          return new Project(projectKey, qualityMeasures, technicalDebt);
        }
      }),
    );
    return projects.filter((project) => project);
  }
}

export type CompanyMeasureInput = {
  projectKeys: string[];
};
