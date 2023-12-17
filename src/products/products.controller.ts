import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';

@Controller('/products')
export class ProductsController {
  public constructor(private readonly productsService: ProductsService) {}

  @Post()
  public async create(@Body() body: CreateProductDto) {
    const created = await this.productsService.create(body);

    return {
      id: created.id,
      supplierId: created.supplierId,
      title: created.title,
      buyingPrice: created.buyingPrice.toNumber(),
      sellingPrice: created.sellingPrice.toNumber(),
      stock: created.stock,
    };
  }

  @Get()
  public async getAll() {
    const data = await this.productsService.findAll();

    return data.map((item) => ({
      id: item.id,
      supplierId: item.supplierId,
      title: item.title,
      buyingPrice: item.buyingPrice.toNumber(),
      sellingPrice: item.sellingPrice.toNumber(),
      stock: item.stock,
    }));
  }

  @Put('/:id')
  public async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateProductDto,
  ) {
    const updated = await this.productsService.update(id, body);

    return {
      id: updated.id,
      supplierId: updated.supplierId,
      title: updated.title,
      buyingPrice: updated.buyingPrice.toNumber(),
      sellingPrice: updated.sellingPrice.toNumber(),
      stock: updated.stock,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.delete(id);
  }
}
