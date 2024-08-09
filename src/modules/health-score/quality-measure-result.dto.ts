export class QualityMeasureResultDto {
    value: number;
    technicalDebt: number;
    items: QualityMeasureResultItemDto[];
}

export class QualityMeasureResultItemDto {
    project: string;
    technicalDebt: number;
    value: number;
}