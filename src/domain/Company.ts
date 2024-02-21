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

  public calculateHealthScore(): number {
    const acummulatedScore = this.projects.reduce((acc, project) => {
      return acc + project.calculateHealthScore();
    }, 0);
    const healthScoreRounded =
      Math.round((acummulatedScore / this.projects.length) * 100) / 100;

    return healthScoreRounded;
  }

  public calculateTechnicalDebt(): number {
    const acummulatedDebt = this.projects.reduce((acc, project) => {
      return acc + project.calculateTechnicalDebt();
    }, 0);
    return acummulatedDebt;
  }
}
