// src/app.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { TasksModule } from './tasks/tasks.module';
import { FoldersModule } from './folders/folders.module';

console.log('Mongo URI:', process.env.MONGO_URI); // Log the Mongo URI for debugging

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI, {
      retryAttempts: 5, // Number of retry attempts
      retryDelay: 3000, // Delay between retries in milliseconds
    }),
    TasksModule,
    FoldersModule,
  ],
})
export class AppModule {}
