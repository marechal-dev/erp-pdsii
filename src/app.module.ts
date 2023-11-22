import { Module } from '@nestjs/common';
import { CustomerModule } from './customer/customer.module';
import { ProductsModule } from './products/products.module';
import { SuppliersModule } from './suppliers/suppliers.module';

@Module({
  imports: [ProductsModule, SuppliersModule, CustomerModule],
})
export class AppModule {}
