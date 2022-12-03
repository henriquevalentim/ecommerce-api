import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  email: string;

  @Prop()
  name: string;

  @Prop()
  genre: string;

  @Prop({ type: Date, required: false })
  birthday: Date;

  @Prop()
  cpf: string;

  @Prop()
  telephone: string;

  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
