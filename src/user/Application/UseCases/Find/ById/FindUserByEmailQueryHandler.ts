import {
  AppQueryHandler,
  AppQueryHandlerDecorator,
} from '../../../../../shared/Application';
import { FindUserByEmailQuery } from './FindUserByEmailQuery';
import { IUser } from '../../../../Domain/Interfaces';
import { UserRepositoryPort } from '../../../Port';
import { Inject } from '@nestjs/common';
import { RepositoryProviders } from '../../../../../shared/Infrastructure';
import { ExposeUser } from '../../../../Domain/Interfaces/Expose';

@AppQueryHandlerDecorator(FindUserByEmailQuery)
export class FindUserByEmailQueryHandler extends AppQueryHandler {
  constructor(
    @Inject(RepositoryProviders.USER_REPOSITORY)
    private readonly repository: UserRepositoryPort,
  ) {
    super();
  }
  async execute(command: FindUserByEmailQuery): Promise<ExposeUser | null> {
    const { email } = command;

    const user = (await this.repository.findOneByEmailThrownException(
      email.value(),
    )) as unknown as IUser;

    return { id: user.id.value(), email: user.email.value() };
  }
}
