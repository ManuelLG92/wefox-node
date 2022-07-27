import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../services';
import { FindUserByEmailContextService } from '../../user/EntryPoint';
import { BcryptService } from '../../shared/Util/bcrypt.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    private readonly userFinder: FindUserByEmailContextService,
  ) {
    super({ usernameField: 'email', passwordField: 'password' });
  }

  async validate(email: string, password: string): Promise<any> {
    const user = await this.userFinder.get(email);
    const isValidPassword = BcryptService.compareEncryptedData(
      password,
      user.password.value(),
    );
    if (!user || !isValidPassword) {
      throw new UnauthorizedException('Email y/o password not valid. ');
    }

    return user;
  }
}
