export class CreateProductDto {
  title: string;
  buyingPrice: number;
  sellingPrice: number;
  stock?: number = 0;
  supplierId: string;
}
