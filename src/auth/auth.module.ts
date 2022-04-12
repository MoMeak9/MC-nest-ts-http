import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "../user/schema/user.schema";
import { UserModule } from "src/user/user.module";
import { LocalStorage } from "./local.strategy";
import { JwtStorage } from './jwt.strategy';

const jwtModule = JwtModule.registerAsync({
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => {
    return {
      secret: configService.get("SECRET", "test123456"),
      signOptions: { expiresIn: "4h" }
    };
  }
});

@Module({
  imports: [
    jwtModule,
    MongooseModule.forFeature([{ name: "User", schema: UserSchema }]),
    UserModule
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStorage, JwtStorage],
  exports: [jwtModule]
})
export class AuthModule {
}
