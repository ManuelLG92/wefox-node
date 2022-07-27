import { IRequestDetail } from 'src/shared/Util';
import { AccessTokenVO, EmailVo, PasswordVO } from './ValueObjects';
import { AggregateRoot } from 'src/shared/Domain/Entity/AggregateRoot';
import { ICreateUserPrimitives, IUser } from './Interfaces';
import { IdValueObject } from '../../shared/Domain/ValueObjects';
import { BcryptService } from '../../shared/Util/bcrypt.service';

export class User extends AggregateRoot {
  email: EmailVo;
  password: PasswordVO;
  accessToken?: AccessTokenVO;
  ctx: IRequestDetail;

  constructor(properties: IUser) {
    super(properties.id);
    this.email = properties.email;
    this.password = properties.password;
    this.accessToken = properties.accessToken;
    this.ctx = properties.ctx;
  }

  static async create(props: IUser, id?: IdValueObject): Promise<User> {
    return new User({
      ...props,
      id: id || IdValueObject.generate(),
      password:
        props.password ||
        new PasswordVO(await BcryptService.encryptData(props.password.value())),
    });
  }

  static fromObject(props: any | null, createId = false): IUser | null {
    if (!props) {
      return null;
    }
    return {
      id: createId ? IdValueObject.generate() : IdValueObject.create(props.id),
      email: EmailVo.create(props.email ?? ''),
      password: new PasswordVO(props.password),
      accessToken: new AccessTokenVO(props?.accessToken ?? null),
      ctx: props.ctx,
    } as unknown as IUser;
  }

  toPersistence(): ICreateUserPrimitives {
    return {
      id: this.id.value(),
      email: this.email.value(),
      password: this.password.value(),
      accessToken: this.accessToken.value(),
      ctx: this.ctx,
    } as unknown as ICreateUserPrimitives;
  }

  updateAccessToken(token: AccessTokenVO): User {
    this.accessToken = token;
    return this;
  }
}
