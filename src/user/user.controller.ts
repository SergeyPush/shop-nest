import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { GetUser } from 'src/auth/get-user.decorator';
import { JwtAdminGuard } from 'src/auth/guards/jwt-admin.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import Roles from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/types/role.interface';
import { JwtRoleGuard } from 'src/auth/guards/jwt-role.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtRoleGuard)
  @Roles([Role.ADMIN])
  @Post('/')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @UseGuards(JwtRoleGuard)
  @Roles([Role.ADMIN])
  @Get('/')
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(JwtRoleGuard)
  @Roles([Role.ADMIN, Role.USER])
  @Get('/me')
  async whoAmI(@GetUser() user) {
    return this.userService.getUserInfo(user);
  }

  @UseGuards(JwtAdminGuard)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.userService.findOne(+id);
  }

  @UseGuards(JwtAdminGuard)
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @UseGuards(JwtAdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
