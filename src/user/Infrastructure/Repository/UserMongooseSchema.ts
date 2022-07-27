import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = UserMongooseSchema & Document;

@Schema()
export class UserMongooseSchema {
  @Prop({ type: String, required: true, unique: true })
  id: string;
  @Prop({ type: String, required: true, unique: true })
  email: string;
  @Prop({ type: String, required: true, unique: true })
  password: string;
  @Prop({ type: String })
  accessToken?: string;
  @Prop(
    raw({
      ip: { type: String },
      originalUrl: { type: String },
      hostname: { type: String },
      userAgent: { type: String },
    }),
  )
  ctx: Record<string, any>;
}

export const UserSchema = SchemaFactory.createForClass(UserMongooseSchema);
