/* user.controller.ts */
// 引入 Nest.js 内置的各个功能
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards
} from "@nestjs/common";
// 引入用户服务
import { UserService } from "./user.service";
// 引入创建用户 DTO 用于限制从接口处传来的参数
import { CreateUserDto } from "./dto/create-user.dto";
import { ApiBearerAuth, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";

// 配置局部路由
@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  // 创建user路由 user/createUser
  @ApiOperation({ summary: "注册用户" })
  @ApiResponse({ status: 201, description: "用户注册成功" })
  @Post("register")
  async createUser(@Body() body: CreateUserDto) {
    return this.userService.create(body);
  }

  //查找所有 user 路由
  @Get("findAll")
  async findAll() {
    return this.userService.findAll();
  }

  // 查找某一个用户路由
  @Get("findOne")
  async findOne(@Query() query: any) {
    return this.userService.findOne(query.name);
  }

  // 删除一个用户的路由
  @Delete(":sid")
  deleteUser(@Param() param: any) {
    return this.userService.delete(param.sid);
  }

  // 更改用户信息的路由
  @Put(":sid")
  updateUser(@Body() body: any, @Param() param: any) {
    return this.userService.updateUser(param.sid, body);
  }

  // 获取用户信息
  @ApiOperation({ summary: "获取用户信息" })
  @ApiBearerAuth() // swagger文档设置token
  @UseGuards(AuthGuard("jwt"))
  @Get("getUserInfo")
  async getUserInfo(@Req() req) {
    return req.user;
  }

  // 用户行为记录
  @ApiOperation({ summary: "用户行为记录" })
  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @Get("createUserBehavior")
  async userBehavior(@Req() req) {
    return this.userService.createUserBehavior(req.user,'LOGIN');
  }

  // 创建验证码
  @ApiOperation({ summary: "创建验证码" })
  @Post("sentCode")
  async sentCode(@Body() body: any) {
    const {email} = body;
    return this.userService.createUserCode(email);
  }
}
