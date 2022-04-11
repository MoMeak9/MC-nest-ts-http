import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class VerifyUserDto {
  @ApiProperty({
    description: "phone number",
    example: "13959595959"
  })
  @IsNotEmpty({ message: "phone is required" })
  readonly phone: string;

  @ApiProperty({ description: "password" })
  @IsNotEmpty({ message: "password" })
  password: string;
}
