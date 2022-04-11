/* user.service.ts */
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "./schema/user.schema";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { v4 } from "uuid";
import { md5 } from "../utils";

@Injectable()
export class UserService {
  // 注册Schema后，可以使用 @InjectModel() 装饰器将 User 模型注入到 UserService 中:
  constructor(@InjectModel("User") private user: Model<UserDocument>) {
  }

  // 创建用户
  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.user.findOne({ email: createUserDto.email });
    if (existingUser) {
      throw new HttpException("用户已存在", HttpStatus.BAD_REQUEST);
    }
    const uuid = v4();
    createUserDto.password = md5(createUserDto.password.toString());
    const createUser = new this.user({
      ...createUserDto,
      uuid
    });
    return await createUser.save();
  }

  // 查找用户列表
  async findAll(): Promise<User[]> {
    // 这里是异步的
    return await this.user.find().exec();
  }

  // 查找
  async findOne(name: string): Promise<User[]> {
    // 这里是异步的
    const temp = await this.user.find({ name });
    return temp;
  }

  // 删除
  async delete(sid: number) {
    // 这里是异步的  remove 方法删除成功并返回相应的个数
    const temp = await this.user.remove({ _id: sid });
    return temp;
  }

  // 修改
  async updateUser(sid: string, data: any) {
    // 这里是异步的  remove 方法删除成功并返回相应的个数
    const temp = await this.user.updateOne({ _id: sid }, { $set: data });
    return temp;
  }
}
