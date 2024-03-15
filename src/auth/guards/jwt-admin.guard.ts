import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  CanActivate,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAdminGuard extends AuthGuard('jwt') {
  handleRequest(err, user) {
    if (err) {
      throw err;
    }
    if (user.role === 'admin') {
      return user;
    }
    throw new UnauthorizedException('Invalid user role');
  }
}
