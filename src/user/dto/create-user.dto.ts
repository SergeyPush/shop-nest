import { $Enums, Prisma } from '@prisma/client';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateUserDto implements Prisma.UserCreateInput {
  @IsString()
  name: string;
  @IsEmail()
  email: string;
  @IsString()
  password: string;
  @IsOptional()
  @IsString()
  role?: $Enums.Role;
  @IsOptional()
  createdAt?: string | Date;
  @IsOptional()
  updatedAt?: string | Date;
}
