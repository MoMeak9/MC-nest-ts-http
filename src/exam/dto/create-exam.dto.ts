import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateExamDto {
  @ApiProperty({
    description: "The name of the exam",
    example: "Exam 1"
  })
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({
    description: "The description of the exam",
    example: "This is the first exam"
  })
  @IsNotEmpty()
  readonly description: string;

  @ApiProperty({
    description: "The content of the exam",
    example: "JSON of the questions"
  })
  @IsNotEmpty()
  readonly content: string;
}
