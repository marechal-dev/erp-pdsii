import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';

@Injectable()
export class SuppliersService {
  public constructor(private readonly prisma: PrismaService) {}

  public async create(createSupplierDto: CreateSupplierDto) {
    const supplier = await this.prisma.supplier.findUnique({
      where: {
        cnpj: createSupplierDto.cnpj,
      },
    });

    if (supplier) {
      throw new ConflictException(
        `Fornecedor ${createSupplierDto.cnpj} já existe.`,
      );
    }

    const created = await this.prisma.supplier.create({
      data: createSupplierDto,
    });

    return created;
  }

  findAll() {
    return this.prisma.supplier.findMany();
  }

  public async update(id: string, updateSupplierDto: UpdateSupplierDto) {
    const supplier = await this.prisma.supplier.findUnique({
      where: { id },
    });

    if (!supplier) {
      throw new NotFoundException(`Fornecedor ${id} não existe`);
    }

    const updated = await this.prisma.supplier.update({
      where: {
        id,
      },
      data: updateSupplierDto,
    });

    return updated;
  }

  public async delete(id: string) {
    const supplier = await this.prisma.supplier.findUnique({
      where: { id },
    });

    if (!supplier) {
      throw new NotFoundException(`Fornecedor ${id} não existe`);
    }

    await this.prisma.supplier.delete({
      where: { id },
    });
  }
}
