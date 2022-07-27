import { Global, Module } from '@nestjs/common';
import * as services from './services';
import { AuthController } from './auth.controller';
import * as strategies from './strategies';
import * as guards from './guards';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import {
  FindUserByEmailContextService,
  UpdateUserAccessTokenContextService,
  UserCreatorContextService,
} from '../user/EntryPoint';
import { CqrsModule } from '@nestjs/cqrs';

@Global()
@Module({
  imports: [
    JwtModule.register({
      secret: process.env.SIGN,
      signOptions: { expiresIn: '10h' },
    }),
    UserModule,
    CqrsModule,
  ],
  controllers: [AuthController],
  providers: [
    ...Object.values(services),
    ...Object.values(strategies),
    ...Object.values(guards),
    FindUserByEmailContextService,
    UpdateUserAccessTokenContextService,
    UserCreatorContextService,
  ],
  exports: [...Object.values(services)],
})
export class AuthModule {}
