import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  public constructor(private readonly prisma: PrismaService) {}

  public async create(createProductDto: CreateProductDto) {
    const created = await this.prisma.product.create({
      data: createProductDto,
    });

    return created;
  }

  findAll() {
    return this.prisma.product.findMany();
  }

  public async update(id: string, updateProductDto: UpdateProductDto) {
    const updated = await this.prisma.product.update({
      where: {
        id,
      },
      data: updateProductDto,
    });

    return updated;
  }
}
