import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Users } from "src/schemas/users.schema";
import * as bcrypt from "bcrypt";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name) private readonly UsersModel: Model<Users>
  ) {}

  async findOne(email: string): Promise<Users | undefined> {
    return this.UsersModel.findOne({ email: email });
  }
  async create(createUserDto: any) {
    let user = await this.UsersModel.findOne({ email: createUserDto.email });
    if (user) {
      throw new Error("User already exists");
    }
    if (!createUserDto.password) {
      throw new Error("Password is required");
    }
    if(!createUserDto.email){
      throw new Error("Email is required");
    }
    if(!createUserDto.user_name){
      throw new Error("User name is required");
    }
    createUserDto.password = await bcrypt.hashSync(createUserDto.password, 10);
    return this.UsersModel.create(createUserDto);
  }
}
