import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CorrectExamDto {
  @ApiProperty()
  @IsNotEmpty({ message: "Please provide exam id" })
  readonly examId: number;

  @ApiProperty()
  @IsNotEmpty({ message: "Please enter your answer paper" })
  readonly answer: string;
}
