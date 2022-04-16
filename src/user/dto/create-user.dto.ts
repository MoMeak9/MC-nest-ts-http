import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateUserDto {
  @ApiProperty({
    description: "phone number",
    example: "13959595959"
  })
  @IsNotEmpty({ message: "phone is required" })
  readonly phone: string;

  @ApiProperty({ description: "Email" })
  @IsNotEmpty({ message: "Email is required" })
  readonly email: string;

  @ApiProperty({ description: "code" })
  @IsNotEmpty({ message: "code is required" })
  readonly code: string;

  @ApiProperty({ description: "password" })
  @IsNotEmpty({ message: "password" })
  password: string;
}
