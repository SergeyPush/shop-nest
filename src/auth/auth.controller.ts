import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Prisma } from '@prisma/client';
import { SignInUserDto } from './dto/sign-in.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  async signIn(@Body() signInUserDto: SignInUserDto) {
    return this.authService.signIn(signInUserDto.email, signInUserDto.password);
  }

  @Post('signup')
  async signUp(@Body() createUserDto: Prisma.UserCreateInput) {
    return this.authService.signUp(createUserDto);
  }
}
