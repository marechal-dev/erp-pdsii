import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { SellsController } from './sells.controller';
import { SellsService } from './sells.service';

@Module({
  controllers: [SellsController],
  providers: [PrismaService, SellsService],
})
export class SellsModule {}
