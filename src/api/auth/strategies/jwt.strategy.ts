import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from '../constants';

/**
 * JWT strategy for auth
 *
 * @author Maloivan Oleksii
 * @version 0.0.1
 * @date 06.01.2022
 **/
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  /**
   * Validation jwt
   * @param payload
   * @returns
   */
  async validate(payload: any) {
    return {
      userId: payload.sub,
      username: payload.username,
      token: jwtConstants.secret,
    };
  }
}
