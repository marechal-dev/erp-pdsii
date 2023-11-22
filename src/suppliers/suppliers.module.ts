import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { SuppliersController } from './suppliers.controller';
import { SuppliersService } from './suppliers.service';

@Module({
  controllers: [SuppliersController],
  providers: [PrismaService, SuppliersService],
})
export class SuppliersModule {}
