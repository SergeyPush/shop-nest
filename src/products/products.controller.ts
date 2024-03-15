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
import { ProductsService } from './products.service';
import { Prisma } from '@prisma/client';
import { JwtAdminGuard } from 'src/auth/guards/jwt-admin.guard';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('/')
  create(@Body() createProductDto: Prisma.ProductCreateInput) {
    return this.productsService.create(createProductDto);
  }

  @Get('/')
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @UseGuards(JwtAdminGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductDto: Prisma.ProductUpdateInput,
  ) {
    return this.productsService.update(+id, updateProductDto);
  }

  @UseGuards(JwtAdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
