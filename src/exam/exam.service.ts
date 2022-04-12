import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Exam, ExamDocument } from "./schema/exam.schema";
import { RecordDocument } from "./schema/record.schema";

@Injectable()
export class ExamService {
  constructor(
    @InjectModel("Exam") private readonly exam: Model<ExamDocument>,
    @InjectModel("Record") private readonly record: Model<RecordDocument>
  ) {
  }

  async createExam(exam: ExamDocument): Promise<Exam> {
    return await this.exam.create(exam);
  }
}
