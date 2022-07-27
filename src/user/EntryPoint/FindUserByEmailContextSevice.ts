import { Inject, Injectable } from '@nestjs/common';
import { RepositoryProviders } from '../../shared/Infrastructure';
import { UserRepositoryPort } from '../Application';
import { IUser } from '../Domain/Interfaces';
import { EmailVo } from '../Domain/ValueObjects';

@Injectable()
export class FindUserByEmailContextService {
  constructor(
    @Inject(RepositoryProviders.USER_REPOSITORY)
    private readonly repositoryPort: UserRepositoryPort,
  ) {}

  async get(email: string): Promise<IUser> {
    return this.repositoryPort.findOneByEmail(new EmailVo(email).value());
  }
}
