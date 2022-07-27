import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { config } from 'dotenv';

import { Injectable } from '@nestjs/common';
import { UserCreatorContextService } from '../../user/EntryPoint';
import { IdValueObject } from '../../shared/Domain/ValueObjects';
import { AuthService } from '../services';
import {
  AccessTokenVO,
  EmailVo,
  PasswordVO,
} from '../../user/Domain/ValueObjects';

config();

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private readonly userCreator: UserCreatorContextService,
    private readonly authService: AuthService,
  ) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: 'http://localhost:3000/auth/google/callback',
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { name, emails } = profile;
    const user = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      accessToken,
    };

    const userToSave = {
      id: IdValueObject.generate().value(),
      email: user.email,
      password: accessToken,
      accessToken,
      ctx: { isGoogleUser: true },
    };

    await this.userCreator.create(userToSave);

    const jwt = await this.authService.jwtCreateAndRefresh(
      {
        id: userToSave.id,
        email: new EmailVo(userToSave.email),
        password: PasswordVO.create(userToSave.password),
        accessToken: AccessTokenVO.create(userToSave.accessToken),
        ctx: userToSave.ctx,
      },
      {},
    );
    done(null, { accessToken: jwt });
  }
}
