import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './service.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserService])],
  exports: [TypeOrmModule],
})
export class UserServiceModule {}
