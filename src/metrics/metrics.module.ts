import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { MetricsController } from './metrics.controller';
import { MetricsService } from './metrics.service';

@Module({
  controllers: [MetricsController],
  providers: [PrismaService, MetricsService],
})
export class MetricsModule {}
