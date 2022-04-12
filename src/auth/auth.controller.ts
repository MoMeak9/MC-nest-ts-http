import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiOperation } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @ApiOperation({ summary: "登录" })
  @UseGuards(AuthGuard("local"))
  @Post("login")
  async login(@Body() user: LoginDto, @Req() req) {
    return await this.authService.login(user, req.user.email);
  }
}
