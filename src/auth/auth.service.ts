import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "../user/schema/user.schema";
import { UserService } from "../user/user.service";
import { md5 } from "../utils";

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService,
              private userService: UserService) {
  }

  createToken(user: Partial<User>) {
    return this.jwtService.sign(user);
  }

  async login(user: Partial<User>, email: string): Promise<any> {
    const existingUser = await this.userService.findOne(email);
    if (!existingUser) {
      throw new HttpException("用户不存在", HttpStatus.BAD_REQUEST);
    }
    if (existingUser[0].password !== md5(user.password)) {
      throw new HttpException("密码错误", HttpStatus.BAD_REQUEST);
    }
    await this.userService.createUserBehavior(existingUser[0]._id, "LOGIN");
    const token = this.createToken({
      ...existingUser[0]
    });
    return {
      token,
      userInfo: existingUser[0]
    };
  }

  async getUser(user) {
    return await this.userService.findOne(user.id);
  }
}
