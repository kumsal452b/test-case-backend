import { Body, Controller, Get, HttpStatus, Post, Query, Req } from "@nestjs/common";
import { UsersService } from "./users.service";
import { AuthGuard } from "src/auth/auth.guard";
import { UseGuards } from "@nestjs/common";
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  private userRequestCounts = new Map<string, number>();
  private userRequestTotalCounts = new Map<string, number>();
  
  @Post()
  create(@Body() createUserDto:any) {
    return this.usersService.create(createUserDto);
  }
  @Get("stream")
  @UseGuards(AuthGuard)
  getUserStream(@Query("stream") stream: string, @Req() req: Request) {
    const userId = (req as any).user?.sub;
    const hash = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const userIdHash = userId.substring(userId.length - 1, userId.length );
    if (stream === "false") {
      return {
        stream_seq: 0,
      };
    }
    if (userId) {
      if (!this.userRequestCounts.has(userId)) {
        this.userRequestCounts.set(userId, 1);
        const oldCount = this.userRequestTotalCounts.get(userId);
        this.userRequestTotalCounts.set(userId, (oldCount ? oldCount : 0) + 1);
      } else {
        const count = this.userRequestCounts.get(userId);

        if (count >= 4) {
          return {
            status: HttpStatus.TOO_MANY_REQUESTS,
            message:
              "Çok fazla istek gönderildi. Lütfen bir dakika sonra tekrar deneyin.",
          };
        }
        this.userRequestCounts.set(userId, count + 1);
        const oldCount = this.userRequestTotalCounts.get(userId);
        this.userRequestTotalCounts.set(userId, (oldCount ? oldCount : 0) + 1);
      }

      setTimeout(() => {
        this.userRequestCounts.delete(userId);
      }, 60000); // 1 dakika
    }
    return {
      message: `Hi Welcome to our stream ${
        (req as any).user.name
      }. This is your visit ${this.userRequestTotalCounts.get(userId)}`,
      group: hash[isNaN(userIdHash) ? 0 : userIdHash],
      rate_limit_left:
        4 -
        (this.userRequestCounts.get(userId)
          ? this.userRequestCounts.get(userId)
          : 0),
    };
  }
}
