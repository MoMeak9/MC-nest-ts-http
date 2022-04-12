import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Exam, ExamDocument } from "./schema/exam.schema";
import { RecordDocument } from "./schema/record.schema";
import { CreateExamDto } from "./dto/create-exam.dto";

@Injectable()
export class ExamService {
  constructor(
    @InjectModel("Exam") private readonly exam: Model<ExamDocument>,
    @InjectModel("Record") private readonly record: Model<RecordDocument>
  ) {
  }

  // 创建考试
  async createExam(exam: CreateExamDto): Promise<Exam> {
    return await this.exam.create(exam);
  }

  // 获取考试列表
  async getExamList(): Promise<Exam[]> {
    return this.exam.find();
  }

  // 获取考试详情
  async getExamDetail(id: string): Promise<Exam> {
    return this.exam.findById(id);
  }

  // 删除考试
  async deleteExam(id: string): Promise<Exam> {
    return this.exam.findByIdAndDelete(id);
  }

  // 更新考试
  async updateExam(id: string, exam: CreateExamDto): Promise<Exam> {
    return this.exam.findByIdAndUpdate(id, exam);
  }

  // 获取单个试卷的考试记录
  async getExamRecord(id: string): Promise<RecordDocument[]> {
    return this.record.find({exam: id});
  }

  // 获取考试记录详情
  async getExamRecordDetail(id: string): Promise<RecordDocument> {
    return this.record.findById(id);
  }

  // 删除考试记录
  async deleteExamRecord(id: string): Promise<RecordDocument> {
    return this.record.findByIdAndDelete(id);
  }

  // 更新考试记录
  async updateExamRecord(id: string, record: RecordDocument): Promise<RecordDocument> {
    return this.record.findByIdAndUpdate(id, record);
  }

  // 添加考试记录
  async addExamRecord(record: RecordDocument): Promise<RecordDocument> {
    return this.record.create(record);
  }

  // 获取考试记录列表
  async getExamRecordList(): Promise<RecordDocument[]> {
    return this.record.find();
  }
}
