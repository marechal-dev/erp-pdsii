import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class MetricsService {
  public constructor(private readonly prisma: PrismaService) {}

  public async fetch() {
    const [sells, products] = await Promise.all([
      this.prisma.sell.findMany(),
      this.prisma.product.findMany(),
    ]);

    return {
      totalSells: sells.length,
      totalInStock: products.reduce((acc, current) => acc + current.stock, 0),
      earnings: Number(
        sells
          .reduce((acc, current) => acc + current.total.toNumber(), 0)
          .toFixed(2),
      ),
      expenses: Number(
        products
          .reduce((acc, current) => acc + current.buyingPrice.toNumber(), 0)
          .toFixed(2),
      ),
    };
  }
}
