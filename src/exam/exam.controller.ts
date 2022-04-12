import { Controller } from "@nestjs/common";
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards
} from "@nestjs/common";

import { ExamService } from "./exam.service";
import { CreateExamDto } from "./dto/create-exam.dto";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";

@Controller("exam")
export class ExamController {
  constructor(private readonly examService: ExamService) {
  }

  @ApiOperation({ summary: "创建考试" })
  @ApiResponse({ status: 201, description: "The exam has been successfully created." })
  @Post()
  async createExam(@Body() createExamDto: CreateExamDto) {
    return await this.examService.createExam(createExamDto);
  }

  @ApiOperation({ summary: "获取考试列表" })
  @Get()
  async getExams() {
    return await this.examService.getExamList();
  }

  @Get(":id")
  async getExam(@Param("id") id: string) {
    return await this.examService.getExamDetail(id);
  }

  @Put(":id")
  async updateExam(@Param("id") id: string, @Body() createExamDto: CreateExamDto) {
    return await this.examService.updateExam(id, createExamDto);
  }
}
