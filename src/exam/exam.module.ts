import { Module } from "@nestjs/common";
import { ExamController } from "./exam.controller";
import { ExamService } from "./exam.service";
import { MongooseModule } from "@nestjs/mongoose";
import { RecordSchema } from "./schema/record.schema";

@Module({
  imports: [MongooseModule.forFeature([{ name: "Record", schema: RecordSchema }])],
  controllers: [ExamController],
  providers: [ExamService],
  exports: [ExamService]
})
export class ExamModule {
}
