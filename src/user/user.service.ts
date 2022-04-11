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

  // 用户注册
  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.user.findOne({ $or: [{ email: createUserDto.email }, { phone: createUserDto.phone }] });
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

  // 用户登入
  async login(email: string, password: string): Promise<User> {
    const user = await this.user.findOne({ email });
    if (!user) {
      throw new HttpException("用户不存在", HttpStatus.BAD_REQUEST);
    }
    if (user.password !== md5(password)) {
      throw new HttpException("密码错误", HttpStatus.BAD_REQUEST);
    }
    return user;
  }

  // 查找用户列表
  async findAll(): Promise<User[]> {
    // 这里是异步的
    return await this.user.find().exec();
  }

  // 查找
  async findOne(name: string): Promise<User[]> {
    // 这里是异步的
    return this.user.find({ name });
  }

  // 删除
  async delete(sid: number) {
    // 这里是异步的  remove 方法删除成功并返回相应的个数
    return this.user.remove({ _id: sid });
  }

  // 修改
  async updateUser(sid: string, data: any) {
    // 这里是异步的  remove 方法删除成功并返回相应的个数
    return this.user.updateOne({ _id: sid }, { $set: data });
  }
}
