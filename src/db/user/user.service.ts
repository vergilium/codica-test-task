import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class DbUserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getUserCredentialByEmail(mail: string): Promise<Partial<User>> {
    return this.userRepository.findOne({
      where: {
        email: mail,
      },
      select: ['id', 'name', 'email', 'password'],
    });
  }

  async addNewUser(user: User) {
    return this.userRepository.save(user);
  }
}
