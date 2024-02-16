import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

@Schema()
export class Users extends Document {
  @Prop()
  user_name: string;
  @Prop()
  email: string;
  @Prop()
  password: string;
  @Prop({ type: Date, default: Date.now })
  created: Date;
}
export const UsersSchema = SchemaFactory.createForClass(Users);
