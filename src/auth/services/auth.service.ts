import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IRequestDetail } from '../../shared/Util';
import { UpdateUserAccessTokenContextService } from '../../user/EntryPoint';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userEntryPointService: UpdateUserAccessTokenContextService,
  ) {}

  googleLogin(req) {
    if (!req.user) {
      return 'No user from google';
    }

    return {
      message: 'User information from google',
      user: req.user,
    };
  }

  async jwtCreateAndRefresh(user: any, ctx: IRequestDetail) {
    const token = this.jwtService.sign({
      id: user.id,
      email: user.email,
      password: user.password,
      ...ctx,
    });
    await this.userEntryPointService.update(user.email.value(), token);

    return token;
  }
}
