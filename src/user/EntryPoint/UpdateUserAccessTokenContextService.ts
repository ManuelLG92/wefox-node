import { Inject, Injectable } from '@nestjs/common';
import { RepositoryProviders } from '../../shared/Infrastructure';
import { UserRepositoryPort } from '../Application';
import { EmailVo, AccessTokenVO } from '../Domain/ValueObjects';
import { User } from '../Domain/User';
import { IUser } from '../Domain/Interfaces';

@Injectable()
export class UpdateUserAccessTokenContextService {
  constructor(
    @Inject(RepositoryProviders.USER_REPOSITORY)
    private readonly repositoryPort: UserRepositoryPort,
  ) {}

  async update(email: string, token: string): Promise<void> {
    const emailVo = new EmailVo(email);
    const tokenVO = new AccessTokenVO(token);
    const userByEmail = (await this.repositoryPort.findOneByEmail(
      emailVo.value(),
    )) as unknown as IUser;
    const user = await User.create(userByEmail, userByEmail.id);
    const updated = user.updateAccessToken(tokenVO);
    await this.repositoryPort.save(updated.toPersistence());
  }
}
