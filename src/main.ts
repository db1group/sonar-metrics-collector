import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import cluster from 'cluster';
import os from 'os';

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const port = process.env.PORT || 3000;
async function bootstrap() {
  const config = new DocumentBuilder()
    .setTitle('Health Sync')
    .setDescription('The health sync API description')
    .setVersion('1.0')
    .build();
  const app = await NestFactory.create(AppModule);
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(port);
}

export class AppClusterService {
  static clusterize(callback: Function): void {
    const numCPUs = os.cpus().length;

    if (cluster.isPrimary) {
      console.log(`Master server started on ${process.pid}`);
      for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
      }
      cluster.on('exit', (worker) => {
        console.log(`Worker ${worker.process.pid} died. Restarting`);
        cluster.fork();
      });
    } else {
      console.log(`Cluster server started on ${process.pid}`);
      callback();
    }
  }
}
AppClusterService.clusterize(bootstrap);
