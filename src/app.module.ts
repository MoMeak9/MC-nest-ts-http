import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import envConfig from "../config/env";
import { ConfigModule } from "@nestjs/config";
import { AppService } from "./app.service";
import { UserModule } from "./user/user.module";
// 引入 Mongoose
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({ isGlobal: true, envFilePath: [envConfig.path] }),
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(`${process.env.DATABASE_URL}`),
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
}
