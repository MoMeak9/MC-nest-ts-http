import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { User } from "./user.schema";
import * as mongoose from "mongoose";

export type UserActivityDocument = UserActivity & mongoose.Document;

@Schema()
export class UserActivity extends mongoose.Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  user: User;

  @Prop({ enum: ["LOGIN", "LOGOUT", "REG", "UPDATE", "REGISTER"], required: true })
  activityType: string;

  @Prop({ type: Date, default: Date.now })
  creat_time: Date;
}

export const UserActivitySchema = SchemaFactory.createForClass(UserActivity);
