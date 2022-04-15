import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "./schema/user.schema";
import { UserActivitySchema } from "./schema/user.activity.schema";
import { UserCodeSchema } from "./schema/user.code.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "User", schema: UserSchema }]),
    MongooseModule.forFeature([{ name: "UserActivity", schema: UserActivitySchema }]),
    MongooseModule.forFeature([{ name: "UserCode", schema: UserCodeSchema }])
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {
}
