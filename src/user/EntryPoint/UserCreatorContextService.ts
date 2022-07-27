import { Injectable } from '@nestjs/common';
import { CreateUserCommand } from '../Application';
import { CommandBus } from '@nestjs/cqrs';
import { ICreateUserPrimitives } from '../Domain/Interfaces';

@Injectable()
export class UserCreatorContextService {
  constructor(private readonly commandBus: CommandBus) {}

  async create(user: ICreateUserPrimitives): Promise<void> {
    return await this.commandBus.execute(new CreateUserCommand({ ...user }));
  }
}
