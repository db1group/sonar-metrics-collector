import { Project } from './Project';

export class CompanyHealthScore {
  private readonly projects: Project[];

  constructor(projects: Project[]) {
    this.projects = projects;
  }

  public getHealthScore(): number {
    const acummulatedScore = this.projects.reduce((acc, project) => {
      return acc + project.getHealthScore();
    }, 0);
    return acummulatedScore / this.projects.length;
  }
}
