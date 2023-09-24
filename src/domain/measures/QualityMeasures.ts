export interface QualityMeasures {
  metricName: QualityMeasuresTypes;
  getQualityRatio(): number;
}

export enum QualityMeasuresTypes {
  RELIABILITY_RATING = 'reliability_rating',
  MANUTENABILITY_RATING = 'sqale_rating',
  SECURITY_RATING = 'security_rating',
  SECURITY_REVIEW_RATING = 'security_review_rating',
  COVERAGE = 'coverage',
  DUPLICATED_LINES_DENSITY = 'duplicated_lines_density',
}

export enum QualityMeasuresValues {
  A = 16.6666,
  B = 12.495,
  C = 8.33,
  D = 4.165,
}
