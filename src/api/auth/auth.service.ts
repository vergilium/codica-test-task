import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import * as bcrypt from 'bcrypt';
import { DbUserService } from 'src/db/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly dbUserService: DbUserService,
  ) {}

  /**
   * User validation
   * @param email The user email
   * @param password The user password
   * @returns Validation result
   */
  async validateUser(email: string, password: string) {
    const creds = await this.dbUserService.getUserCredentialByEmail(email);

    if (creds && bcrypt.compareSync(password, creds.password)) {
      return {
        id: creds.id,
        email: creds.email,
        name: creds.name,
        token: jwtConstants.secret,
      };
    }
    return null;
  }

  /**
   * Creating JWT by user
   * @param user User object
   * @returns The token object
   */
  async login(user: any) {
    const payload = { username: user.email, sub: user.id };
    return {
      success: true,
      access_token: this.jwtService.sign(payload),
    };
  }
}
