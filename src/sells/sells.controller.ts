import { Body, Controller, Post } from '@nestjs/common';
import { CreateSellDto } from './dto/create-sell.dto';
import { SellsService } from './sells.service';

@Controller('sells')
export class SellsController {
  constructor(private readonly sellsService: SellsService) {}

  @Post()
  public async create(@Body() createSellDto: CreateSellDto) {
    const created = await this.sellsService.create(createSellDto);

    return {
      id: created.id,
      customerId: created.customerId,
      productId: created.productId,
      quantity: created.quantity,
      total: created.total.toNumber(),
    };
  }
}
