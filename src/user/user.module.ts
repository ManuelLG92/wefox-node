import { Module } from '@nestjs/common';
import * as Controllers from './Controller/Rest';
import { CommandHandlers, QueryHandlers } from './Application';
import { MongoUserRepository } from './Infrastructure/Repository';
import { CqrsModule } from '@nestjs/cqrs';
import * as EntryPoints from './EntryPoint';
import {
  AppRepositoryService,
  RepositoryProviders,
} from '../shared/Infrastructure';
import { MongooseModule } from '@nestjs/mongoose';
import { UserMongooseSchema, UserSchema } from './Infrastructure/Repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserMongooseSchema.name, schema: UserSchema },
    ]),
    CqrsModule,
  ],
  controllers: [...Object.values(Controllers)],
  providers: [
    AppRepositoryService,
    UserMongooseSchema,
    {
      provide: RepositoryProviders.USER_REPOSITORY,
      useClass: MongoUserRepository,
    },
    ...CommandHandlers,
    ...QueryHandlers,
    ...Object.values(EntryPoints),
  ],
  exports: [
    ...Object.values(EntryPoints),
    {
      provide: RepositoryProviders.USER_REPOSITORY,
      useClass: MongoUserRepository,
    },
  ],
})
export class UserModule {}
