import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import { User } from "../../user/schema/user.schema";
import { Exam } from "./exam.schema";

export type RecordDocument = Record & mongoose.Document;

@Schema()
export class Record extends mongoose.Document {

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User" })
  user: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Exam" })
  exam: Exam;

  @Prop({ required: true })
  answer: Array<any>;

  @Prop({ default: 0 })
  paper_score: number;

  @Prop({ default: 0 })
  paper_percentage: number;

  @Prop({ type: Date, default: Date.now })
  creat_time: Date;

  @Prop({ type: Date, default: Date.now })
  update_time: Date;
}

export const RecordSchema = SchemaFactory.createForClass(Record);
