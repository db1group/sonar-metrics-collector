import { HealthScore, HealthScoreItem } from './HealthScore';
import { Project } from './Project';
import { NoProjectError } from './health-score/exceptions/InvalidProjectError';

export class Company {
  private readonly projects: Project[];

  constructor(projects: Project[]) {
    this.projects = projects;
    if (this.projects.length === 0) {
      throw new NoProjectError();
    }
  }

  public calculateHealthScore(): HealthScore {
    const items = this.calculateItems();

    const acummulatedScore = items.reduce((acc, item) => {
      return acc + item.value
    }, 0);

    const healthScoreRounded =
      Math.round((acummulatedScore / this.projects.length) * 100) / 100;

    const acummulatedDebt = items.reduce((acc, item) => {
      return acc + item.technicalDebt;
    }, 0);

    return {
      value: healthScoreRounded,
      technicalDebt: acummulatedDebt,
      items,
    }
  }

  private calculateItems(): HealthScoreItem[] {
    return this.projects.map((project) => {
      const technicalDebt = project.calculateTechnicalDebt();
      const value = project.calculateHealthScore();
      return {
        project: project.getName(),
        technicalDebt,
        value,
      };
    });
  }
}
