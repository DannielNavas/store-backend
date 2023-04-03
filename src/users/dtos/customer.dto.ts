import { PartialType } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class CreateCustomerDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly lastName: string;

  @IsPhoneNumber()
  @IsNotEmpty()
  readonly phone: string;

  @IsNotEmpty()
  @IsArray()
  readonly skills: any;
}

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {}
