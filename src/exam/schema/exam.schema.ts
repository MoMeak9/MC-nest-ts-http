import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";

export type ExamDocument = mongoose.Document & Exam;

@Schema()
export class Exam extends mongoose.Document {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  content: string;

  @Prop({ type: Date, default: Date.now })
  creat_time: Date;

  @Prop({ type: Date, default: Date.now })
  update_time: Date;
}

export const ExamSchema = SchemaFactory.createForClass(Exam);
