import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "./schema/user.schema";
import { UserCode, UserCodeDocument } from "./schema/user.code.schema";
import { UserActivity, UserActivityDocument } from "./schema/user.activity.schema";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { v4 } from "uuid";
import { md5 } from "../utils";
import { getPagination } from "../utils/paging";

@Injectable()
export class UserService {
  // 注册Schema后，可以使用 @InjectModel() 装饰器将 User 模型注入到 UserService 中:
  constructor(
    @InjectModel("User") private user: Model<UserDocument>,
    @InjectModel("UserActivity") private userActivity: Model<UserActivityDocument>,
    @InjectModel("UserCode") private userCode: Model<UserCodeDocument>
  ) {
  }

  // 用户注册
  async create(createUserDto): Promise<User> {
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
    await this.createUserBehavior(createUser._id, "REGISTER");
    return await createUser.save();
  }

  // 查找用户列表
  async findAll(): Promise<any> {
    // 这里是异步的
    return await getPagination(this.user, {});
  }

  // 查找
  async findOne(email: string): Promise<User[]> {
    // 这里是异步的
    return this.user.find({ email });
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

  // 创建用户行为
  async createUserBehavior(userId: string, activityType: string): Promise<UserActivity> {
    return await this.userActivity.create({
      user: userId,
      activityType
    });
  }

  // 新建验证码
  async createUserCode(email: string): Promise<UserCode> {
    const existingCode = await this.userCode.findOne({ email });
    if (existingCode) {
      throw new HttpException("验证码已发送", HttpStatus.BAD_REQUEST);
    }
    setTimeout(async () => {
      this.userCode.deleteOne({ email });
    }, 120 * 1000);
    const code = Math.random().toString(36).slice(2, 8).toUpperCase();
    return await this.userCode.create({
      email,
      code
    });
  }
}
