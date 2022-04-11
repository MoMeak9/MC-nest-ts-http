import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateUserDto {
  @ApiProperty({
    description: "phone number",
    example: "13959595959"
  })
  @IsNotEmpty({ message: "phone is required" })
  readonly phone: string;

  @ApiProperty({ description: "邮箱" })
  @IsNotEmpty({ message: "邮箱地址必填" })
  readonly email: string;

  @ApiProperty({ description: "password" })
  @IsNotEmpty({ message: "password" })
  password: string;
}
