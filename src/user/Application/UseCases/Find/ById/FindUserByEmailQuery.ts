import { AppQuery } from '../../../../../shared/Application';
import { EmailVo } from '../../../../Domain/ValueObjects';

export class FindUserByEmailQuery implements AppQuery {
  constructor(public readonly email: EmailVo) {}

  static create(email: string | null) {
    return new FindUserByEmailQuery(
      EmailVo.create(email ?? '') as unknown as EmailVo,
    );
  }
}
