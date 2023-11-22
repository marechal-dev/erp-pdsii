import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateSellDto } from './dto/create-sell.dto';

@Injectable()
export class SellsService {
  public constructor(private readonly prisma: PrismaService) {}

  public async create(createSellDto: CreateSellDto) {
    if (createSellDto.quantity <= 0) {
      throw new BadRequestException(
        'Não é possível vender nenhum ou uma quantidade negativa de produtos.',
      );
    }

    const product = await this.prisma.product.findUnique({
      where: {
        id: createSellDto.productId,
      },
    });

    if (!product) {
      throw new NotFoundException(
        `Produto ${createSellDto.productId} não encontrado.`,
      );
    }

    const remainingProductInStock = product.stock - createSellDto.quantity;

    if (remainingProductInStock < 0) {
      throw new BadRequestException(
        'Venda não autorizada: a venda resultaria em estoque negativo.',
      );
    }

    await this.prisma.product.update({
      where: {
        id: product.id,
      },
      data: {
        stock: {
          decrement: createSellDto.quantity,
        },
      },
    });

    const total = product.sellingPrice.toNumber() * createSellDto.quantity;

    const created = await this.prisma.sell.create({
      data: {
        ...createSellDto,
        total,
      },
    });

    return created;
  }
}
