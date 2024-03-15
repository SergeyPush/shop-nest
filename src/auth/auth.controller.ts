import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Prisma } from '@prisma/client';
import { SignInUserDto } from './dto/sign-in.dto';

import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { GetUser } from './get-user.decorator';

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
