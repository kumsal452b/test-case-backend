import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { LoginAuthDto } from "./dto/login-auth.dto";
import { UsersService } from "../users/users.service";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async checkPassword(email: string, password: string) {
    // const userFromDb = await this.usersService.findOne({ email: email });
    // if (!userFromDb)
    //   throw new HttpException('LOGIN.USER_NOT_FOUND', HttpStatus.NOT_FOUND);
    // return await bcrypt.compare(password, userFromDb.password);
  }
  async login(loginAuthDto: LoginAuthDto) {
    const user = await this.usersService.findOne(loginAuthDto.email);
    if (!user) {
      throw new NotFoundException("User not found.");
    }
    const isMatch = await bcrypt.compare(loginAuthDto.password, user.password);
    if (!isMatch) {
       throw new UnauthorizedException("Invalid credentials.");
    }
    const payload = {
      name: user.user_name,
      email: user.email,
      sub: user.id,
    };
    return {
      access_token: await this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET,
      }),
    };
  }
}
