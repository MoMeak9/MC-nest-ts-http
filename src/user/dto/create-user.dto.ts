import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'name' })
  @IsNotEmpty({ message: 'name地址必填' })
  readonly name: string;

  @ApiProperty({ description: 'password' })
  @IsNotEmpty({ message: 'password' })
  readonly password: string;
}
