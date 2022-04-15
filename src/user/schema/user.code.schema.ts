import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";

export type UserCodeDocument = UserCode & mongoose.Document;

@Schema()
export class UserCode extends mongoose.Document {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  code: string;

  @Prop({ type: Date, default: Date.now })
  creat_time: Date;
}

export const UserCodeSchema = SchemaFactory.createForClass(UserCode);
