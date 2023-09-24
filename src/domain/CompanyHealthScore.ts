import { Project } from './Project';
import { InvalidProjectError } from './exceptions/InvalidProjectError';

export class CompanyHealthScore {
  private readonly projects: Project[];

  constructor(projects: Project[]) {
    this.projects = projects;
    if (this.projects.length === 0) {
      throw new InvalidProjectError();
    }
  }

  public getHealthScore(): number {
    const acummulatedScore = this.projects.reduce((acc, project) => {
      return acc + project.getHealthScore();
    }, 0);
    const healthScoreRounded = Math.round((acummulatedScore / this.projects.length) * 100) / 100;

    return healthScoreRounded;
  }
}
