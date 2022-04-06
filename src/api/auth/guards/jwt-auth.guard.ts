import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest<TUser = any>(
    err: any,
    user: any,
    info: any,
    context: any,
    status?: any,
  ): TUser {
    const error = err || info;
    //Validate error authorization and throw exception
    if (error)
      throw new UnauthorizedException({
        success: false,
        message: error.name,
        data: {
          statusCode: 401,
          message: error.message,
        },
      });
    //Return user object if authorized
    return user;
  }
}
