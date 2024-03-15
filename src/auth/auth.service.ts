import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Prisma } from '@prisma/client';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(createUserDto: Prisma.UserCreateInput) {
    const user = await this.userService.create(createUserDto);
    return this.signUser(user);
  }
  async signIn(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (user && (await this.userService.validateUser(email, password))) {
      return this.signUser(user);
    }
  }

  async signUser(
    user: Prisma.UserGetPayload<{ select: { id: true; email: true } }>,
  ) {
    const payload = {
      id: user.id,
      email: user.email,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
