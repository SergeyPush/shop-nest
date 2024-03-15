import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ProductsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createProductDto: Prisma.ProductCreateInput) {
    try {
      const product = await this.databaseService.product.create({
        data: createProductDto,
      });
      return product;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll() {
    return this.databaseService.product.findMany();
  }

  async findOne(id: number) {
    const product = await this.databaseService.product.findUnique({
      where: { id },
    });
    if (product) {
      return product;
    }
    throw new NotFoundException('Product not found');
  }

  async update(id: number, updateProductDto: Prisma.ProductUpdateInput) {
    const product = await this.databaseService.product.findUnique({
      where: { id },
    });
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return this.databaseService.product.update({
      where: { id },
      data: updateProductDto,
    });
  }

  async remove(id: number) {
    return this.databaseService.product.delete({ where: { id } });
  }
}
