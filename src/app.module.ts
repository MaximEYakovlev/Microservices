import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Pool } from 'pg';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'DATABASE_POOL',
      useFactory: async () => {
        const pool = new Pool({
          host: process.env.DATABASE_HOST,
          port: parseInt(process.env.DATABASE_PORT, 10),
          user: process.env.DATABASE_USER,
          password: process.env.DATABASE_PASSWORD,
          database: process.env.DATABASE_NAME,
        });
        await pool.query('SELECT 1');
        console.log('Connected to the database successfully!');

        return pool;
      },
    },
  ],
  exports: ['DATABASE_POOL'],
})
export class AppModule {}
