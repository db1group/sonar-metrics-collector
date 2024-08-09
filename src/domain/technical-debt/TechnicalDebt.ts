export class TechnicalDebt {
  constructor(private readonly value: number) {}

  calculateTechnicalDebt(): number {
    const hour = 60;
    const technicalDebtInHours = this.value / hour;
    return technicalDebtInHours;
  }
}
