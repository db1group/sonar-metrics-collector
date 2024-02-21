import { TechnicalDebt } from '@/domain/technical-debt/TechnicalDebt';

export interface TechnicalDebtProvider {
  getTechnicalDebtFromProject(project: string): Promise<TechnicalDebt>;
}
