import { Body, Controller, Get, Param, Post, Request } from '@nestjs/common';
import { User } from 'src/db/user/user.entity';
import { DbUserService } from 'src/db/user/user.service';
import { ValidationPipe } from '../pipes/validation.pipe';

@Controller()
export class UserController {
  constructor(private readonly dbUserService: DbUserService) {}
  //TODO:
  @Post('/register')
  async create(@Body(new ValidationPipe()) user: User) {
    const newUser = await this.dbUserService.addNewUser(user);
    if (newUser) {
      return {
        success: true,
        message: 'new user has been added!',
      };
    }
    throw new Error('error adding new user!');
  }

  @Get('/check/:email')
  async check(@Param('email') email: string) {
    const creds = await this.dbUserService.getUserCredentialByEmail(email);
    return {
      success: true,
      exist: Boolean(creds),
    };
  }
}
