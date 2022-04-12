import { BadRequestException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { IStrategyOptions, Strategy } from "passport-local";
import { UserDocument } from "../user/schema/user.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

export class LocalStorage extends PassportStrategy(Strategy) {
  constructor(@InjectModel("User") private user: Model<UserDocument>) {
    super({
      usernameField: "email",
      passwordField: "password",
      session: false
    } as IStrategyOptions);
  }

  async validate(email: string) {
    // 因为密码是加密后的，没办法直接对比用户名密码，只能先根据用户名查出用户，再比对密码
    const user = await this.user.findOne({ email: email });

    if (!user) {
      throw new BadRequestException("用户名不正确！");
    }
    return user;
  }
}
