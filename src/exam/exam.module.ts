import { Module } from "@nestjs/common";
import { ExamController } from "./exam.controller";
import { ExamService } from "./exam.service";
import { MongooseModule } from "@nestjs/mongoose";
import { RecordSchema } from "./schema/record.schema";
import { ExamSchema } from "./schema/exam.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Record", schema: RecordSchema }]),
    MongooseModule.forFeature([{ name: "Exam", schema: ExamSchema }])],
  controllers: [ExamController],
  providers: [ExamService],
  exports: [ExamService]
})
export class ExamModule {
}
