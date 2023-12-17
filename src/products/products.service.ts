import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  public constructor(private readonly prisma: PrismaService) {}

  public async create(createProductDto: CreateProductDto) {
    if (createProductDto.buyingPrice <= 0) {
      throw new BadRequestException(
        'Produto não pode ter preço de compra zerado ou negativo.',
      );
    }

    if (createProductDto.sellingPrice <= 0) {
      throw new BadRequestException(
        'Produto não pode ter preço de venda zerado ou negativo.',
      );
    }

    if (createProductDto.stock < 0) {
      throw new BadRequestException('Produto não pode quantidade negativa.');
    }

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

  public async delete(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException(`Produto ${id} não existe`);
    }

    await this.prisma.product.delete({
      where: { id },
    });
  }
}
