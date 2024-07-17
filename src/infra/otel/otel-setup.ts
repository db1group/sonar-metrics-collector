/*instrumentation.ts*/
import * as opentelemetry from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-proto';
import { OTLPMetricExporter } from '@opentelemetry/exporter-metrics-otlp-proto';
import { PeriodicExportingMetricReader } from '@opentelemetry/sdk-metrics';

import { diag, DiagConsoleLogger, DiagLogLevel } from '@opentelemetry/api';

diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.INFO);

export const opentelemetrySetup = new opentelemetry.NodeSDK({
  serviceName: 'Sonar Metrics Collector',
  traceExporter: new OTLPTraceExporter({
    url: 'http://localhost:4318/v1/traces',
    concurrencyLimit: 100,
  }),
  metricReader: new PeriodicExportingMetricReader({
    exporter: new OTLPMetricExporter({
      concurrencyLimit: 100,
      url: 'http://localhost:4318/v1/metrics',
    }),
  }),
  instrumentations: [getNodeAutoInstrumentations()],
});

opentelemetrySetup.start();
