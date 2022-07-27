import { IRequestDetail } from 'src/shared/Util';

export interface IUpdateUserPrimitives {
  id?: string;
  email?: string;
  password?: string;
  isGoogleUser?: boolean;
  ctx: IRequestDetail;
}
