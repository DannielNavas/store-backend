import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber, IsPositive, IsUrl } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  readonly name: string;
  @IsNotEmpty()
  readonly description: string;
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly price: number;
  @IsUrl()
  @IsNotEmpty()
  readonly image: string;
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly stock: number;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}
