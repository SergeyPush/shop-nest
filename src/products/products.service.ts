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

  async findAll(limit: number = 3, page: number = 1) {
    const count = await this.databaseService.product.count();
    const skip = (page - 1) * limit;
    const products = await this.databaseService.product.findMany({
      take: Math.max(limit, 3),
      skip: Math.max(skip, 0),
    });
    return {
      products,
      count,
      page: Math.max(page, 1),
      pages: Math.ceil(count / limit) || 1,
    };
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
