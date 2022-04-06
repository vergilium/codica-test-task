import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/db/db.module';
import { ApiService } from './api.service';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './controllers/auth.controller';
import { UserController } from './controllers/user.controller';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [AuthController, UserController],
  providers: [ApiService],
})
export class ApiModule {}
