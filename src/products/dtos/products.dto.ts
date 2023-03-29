import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive, IsUrl } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @ApiProperty({ description: 'The name of the Product.' })
  readonly name: string;
  @IsNotEmpty()
  @ApiProperty({ description: 'The description of the Product.' })
  readonly description: string;
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty({ description: 'The price of the Product.' })
  readonly price: number;
  @IsUrl()
  @IsNotEmpty()
  @ApiProperty({ description: 'The image of the Product.' })
  readonly image: string;
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty({ description: 'The stock of the Product.' })
  readonly stock: number;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}
