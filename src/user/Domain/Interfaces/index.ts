import { AccessTokenVO, EmailVo, PasswordVO } from '../ValueObjects';
import { IdValueObject } from '../../../shared/Domain/ValueObjects';
import { IRequestDetail } from '../../../shared/Util';

export interface IUser {
  id: IdValueObject;
  email: EmailVo;
  password: PasswordVO;
  accessToken: AccessTokenVO;
  ctx?: IRequestDetail;
}

export * from './Incoming';
