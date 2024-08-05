export class HealthScore {
    value: number;
    technicalDebt: number;
    items: HealthScoreItem[];
}

export class HealthScoreItem {
    project: string;
    technicalDebt: number;
    value: number;
}