import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  handleRequest<TUser = any>(
    err: any,
    user: any,
    info: any,
    context: any,
    status?: any,
  ): TUser {
    const error = err || info;
    if (error) {
      throw new UnauthorizedException({
        success: false,
        message: error.name,
        data: {
          statusCode: 401,
          message: error.message,
        },
      });
    }
    return user;
  }
}
