import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { genSalt, hash, compare } from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createUserDto: Prisma.UserCreateInput) {
    const salt = await genSalt(10);
    try {
      const user = await this.databaseService.user.create({
        data: {
          ...createUserDto,
          password: await hash(createUserDto.password, salt),
        },
      });
      return user;
    } catch (error) {
      if (error.code === 'P2002') {
        throw new BadRequestException('Email already exists');
      }
      throw new BadRequestException(error.message);
    }
  }

  async findAll() {
    return this.databaseService.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async findOne(id: number) {
    const user = await this.databaseService.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    delete user.password;
    return user;
  }

  async findByEmail(email: string) {
    const user = await this.databaseService.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async update(id: number, updateUserDto: Prisma.UserUpdateInput) {
    await this.findOne(id);
    return this.databaseService.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.databaseService.user.delete({ where: { id } });
  }

  async getUserInfo(user: Prisma.UserGetPayload<{ select: { id: true } }>) {
    return this.findOne(user.id);
  }

  async validateUser(email: string, password: string) {
    const user = await this.findByEmail(email);
    if (user && (await compare(password, user.password))) {
      return user;
    }
    throw new BadRequestException('Invalid credentials');
  }
}
