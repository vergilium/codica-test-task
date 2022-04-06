import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseFactory } from './db.config';
import { DatabaseService } from './db.service';
import { DbUserModule } from './user/user.module';
import { DbUserService } from './user/user.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [DatabaseFactory],
      useClass: DatabaseFactory,
    }),
    DbUserModule,
  ],
  providers: [DatabaseService, DbUserService],
  exports: [DbUserService, DatabaseService],
})
export class DatabaseModule {}
