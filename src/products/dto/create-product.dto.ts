import { Prisma } from '@prisma/client';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProductDto implements Prisma.ProductCreateInput {
  @IsString()
  title: string;
  @IsString()
  description: string;
  @IsNumber()
  price: number;
  @IsOptional()
  createdAt?: string | Date;
  @IsOptional()
  updatedAt?: string | Date;
}
