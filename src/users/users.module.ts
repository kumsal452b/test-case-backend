import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { RequestLimitMiddleware } from "src/middleware/RequestLimitMiddleware";
import { MongooseModule } from "@nestjs/mongoose";
import { Users, UsersSchema } from "src/schemas/users.schema";

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    MongooseModule.forFeature([{ name: Users.name, schema: UsersSchema }]),
  ],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLimitMiddleware).forRoutes("users/stream");
  }
}
