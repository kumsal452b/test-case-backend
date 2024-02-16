import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { UsersService } from "src/users/users.service";
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private userService: UsersService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    let token = this.extractTokenFromHeader(request);
    if (token) {
      let theFirstCheck = token.substring(0, token.indexOf("ey"));
      if (theFirstCheck !== "") {
        token=token.replaceAll(theFirstCheck, "");
        if (theFirstCheck.includes("USER")) {
          let theCheckNumber = theFirstCheck.replaceAll("USER", "");
          if (isNaN(Number(theCheckNumber))) {
            throw new UnauthorizedException();
          } else {
            if (theCheckNumber.length !== 3) {
              throw new UnauthorizedException();
            }
          }
        } else {
          throw new UnauthorizedException();
        }
      } else {
        throw new UnauthorizedException();
      }
    }
    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      request.user=payload;
      return true;
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(" ") ?? [];
    return type === "Bearer" ? token : undefined;
  }
}
