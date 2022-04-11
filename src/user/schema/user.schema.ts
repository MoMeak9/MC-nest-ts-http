import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
// @Prop 装饰器接受一个可选的参数，通过这个，你可以指示这个属性是否是必须的，是否需要默认值，或者是标记它作为一个常量，下面是例子
// SchemaFactory 是 mongoose 内置的一个方法做用是读取模式文档 并创建 Schema 对象
import { Document } from "mongoose";

export type UserDocument = User & Document;

@Schema()
export class User extends Document {
  @Prop({ required: true })
  uuid: string;

  @Prop()
  name: string;

  @Prop()
  game_id: string;

  @Prop({ default: 0 })
  age: number;

  @Prop({required: true})
  email: string;

  @Prop({ required: true })
  phone: string;

  @Prop()
  QQ: string;

  @Prop()
  imageUrl: string;

  @Prop({ default: 0 })
  score: number;

  @Prop({ default: false })
  is_whitelist: boolean;

  @Prop({ required: true })
  password: string;

  @Prop({ type: Date, default: Date.now })
  creat_time: Date;

  @Prop({ type: Date, default: Date.now })
  update_time: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
