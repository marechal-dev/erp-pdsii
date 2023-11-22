import { Module } from '@nestjs/common';
import { CustomerModule } from './customer/customer.module';
import { ProductsModule } from './products/products.module';
import { SuppliersModule } from './suppliers/suppliers.module';
import { SellsModule } from './sells/sells.module';
import { MetricsModule } from './metrics/metrics.module';

@Module({
  imports: [ProductsModule, SuppliersModule, CustomerModule, SellsModule, MetricsModule],
})
export class AppModule {}
