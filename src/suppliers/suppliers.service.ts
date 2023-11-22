import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';

@Injectable()
export class SuppliersService {
  public constructor(private readonly prisma: PrismaService) {}

  public async create(createSupplierDto: CreateSupplierDto) {
    const created = await this.prisma.supplier.create({
      data: createSupplierDto,
    });

    return created;
  }

  findAll() {
    return this.prisma.supplier.findMany();
  }

  public async update(id: string, updateSupplierDto: UpdateSupplierDto) {
    const updated = await this.prisma.supplier.update({
      where: {
        id,
      },
      data: updateSupplierDto,
    });

    return updated;
  }
}