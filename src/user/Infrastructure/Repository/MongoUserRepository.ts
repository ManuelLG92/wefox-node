import { UserRepositoryPort } from '../../Application';
import { User } from '../../Domain/User';
import { Injectable } from '@nestjs/common';
import { ICreateUserPrimitives } from '../../Domain/Interfaces';
import { IUser } from '../../Domain/Interfaces';
import { AppRepositoryService } from '../../../shared/Infrastructure';
import { UserDocument, UserMongooseSchema } from './UserMongooseSchema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { WefoxNotFoundException } from '../../../shared/Domain/Services/Exceptions/WefoxNotFoundException';

@Injectable()
export class MongoUserRepository implements UserRepositoryPort {
  public constructor(
    private readonly appRepository: AppRepositoryService<UserDocument>,
    @InjectModel(UserMongooseSchema.name)
    private userModel: Model<UserDocument>,
  ) {}

  async findOneByEmailThrownException(email: string): Promise<IUser> {
    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new WefoxNotFoundException(`User not found for email: ${email}`);
    }
    return User.fromObject(user);
  }

  async findOneByEmail(email: string): Promise<IUser | null> {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      return null;
    }
    return User.fromObject(user);
  }

  async save(user: ICreateUserPrimitives): Promise<void> {
    const userFetched = await this.userModel.findOne({ email: user.email });
    if (userFetched) {
      userFetched.update({ _id: userFetched._id }, { ...user });
      return;
    }
    const userModel = new this.userModel(user);
    await userModel.save();
  }
}
