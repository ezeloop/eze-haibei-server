// src/app.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { TasksModule } from './tasks/tasks.module';
import { FoldersModule } from './folders/folders.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI, {
      retryAttempts: 5,
      retryDelay: 3000,
    }),
    TasksModule,
    FoldersModule,
  ],
})
export class AppModule {}
