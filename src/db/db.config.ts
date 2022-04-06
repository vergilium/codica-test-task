import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UserService } from './service/service.entity';
import { User } from './user/user.entity';

@Injectable()
export class DatabaseFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT) || 5432,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      dropSchema: true,
      synchronize: true,
      entities: [User, UserService],
      logging: ['query', 'error'],
    };
  }
}
