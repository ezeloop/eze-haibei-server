import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Callback } from 'aws-lambda';
import { Server } from 'http';
let cachedServer: Server;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:3000', // Your frontend URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  
  await app.listen(4000);
    return app.getHttpAdapter().getInstance();

}
export const handler = async (event: any, context: any, callback: Callback) => {
  if (!cachedServer) {
    const app = await bootstrap();
    cachedServer = app;
  }
  return cachedServer(event, context, callback);
};