const { NestFactory } = require('@nestjs/core');
const { AppModule } = require('../dist/app.module');

async function createNestServer(expressApp) {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));
  
  app.enableCors({
    origin: process.env.FRONT_END_URL || 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  await app.init();
  return app;
}

module.exports = { createNestServer };
