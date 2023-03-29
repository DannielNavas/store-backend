import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsEmail()
  @ApiProperty({ description: 'The email of the User.' })
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @Length(6)
  @ApiProperty({ description: 'The password of the User.' })
  readonly password: string;

  @IsNotEmpty()
  @ApiProperty({ description: 'The role of the User.' })
  readonly role: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
