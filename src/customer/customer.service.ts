import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomerService {
  public constructor(private readonly prisma: PrismaService) {}

  public async create(createCustomerDto: CreateCustomerDto) {
    const customer = await this.prisma.customer.findUnique({
      where: {
        cpf: createCustomerDto.cpf,
      },
    });

    if (customer) {
      throw new ConflictException(
        `Cliente ${createCustomerDto.cpf} já existe.`,
      );
    }

    const created = await this.prisma.customer.create({
      data: createCustomerDto,
    });

    return created;
  }

  findAll() {
    return this.prisma.customer.findMany();
  }

  public async update(id: string, updateCustomerDto: UpdateCustomerDto) {
    const updated = await this.prisma.customer.update({
      where: {
        id,
      },
      data: updateCustomerDto,
    });

    return updated;
  }
}
