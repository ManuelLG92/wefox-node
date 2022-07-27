import { IRequestDetail } from '../../../../shared/Util';

export interface ICreateUserPrimitives {
  id?: string;
  email: string;
  password: string;
  accessToken?: string;
  ctx?: IRequestDetail;
}
