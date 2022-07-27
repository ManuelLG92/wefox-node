import { CreateUserCommand } from './CreateUserCommand';
import { User } from 'src/user/Domain/User';
import {
  AppCommandHandler,
  AppCommandHandlerDecorator,
} from 'src/shared/Application';
import { BadRequestException, Inject } from '@nestjs/common';
import { UserRepositoryPort } from '../../Port';
import { RepositoryProviders } from '../../../../shared/Infrastructure';

@AppCommandHandlerDecorator(CreateUserCommand)
export class CreateUserCommandHandler extends AppCommandHandler {
  constructor(
    @Inject(RepositoryProviders.USER_REPOSITORY)
    private readonly repository: UserRepositoryPort,
  ) {
    super();
  }

  async execute(command: CreateUserCommand): Promise<void> {
    const { data } = command;

    if (!data.ctx.isGoogleUser) {
      await this.checkIfExistsUserByEmail(data.email);
    }

    const user = await User.create(User.fromObject({ ...data }, !data.id));

    await this.repository.save(user.toPersistence());
  }

  private async checkIfExistsUserByEmail(email: string) {
    if (await this.repository.findOneByEmail(email)) {
      throw new BadRequestException(
        'This email is already used. Pick up another one.',
      );
    }
  }
}
