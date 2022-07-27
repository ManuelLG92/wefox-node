import { Injectable } from '@nestjs/common';
import { ICreateUserPrimitives } from 'src/user/Domain/Interfaces';
import { IUser } from '../../Domain/Interfaces';

@Injectable()
export abstract class UserRepositoryPort {
  abstract save(user: ICreateUserPrimitives): Promise<void>;
  abstract findOneByEmail(email: string): Promise<IUser | null>;
  abstract findOneByEmailThrownException(email: string): Promise<IUser>;
}
