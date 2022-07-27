import { CacheModule, Module } from '@nestjs/common';
import { CheckAddressDto } from './Application/Request';
import { CheckAddressDtoConstraint } from './Infrastructure/RequestContraint/CheckAddressDtoConstraint';
import * as Controllers from './Controller';
import { QueryHandlers } from './Application';
import { CqrsModule } from '@nestjs/cqrs';
import * as Services from './Services';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    CacheModule.register({
      store: redisStore,
      host: 'redis',
      port: 6379,
    }),
    CqrsModule,
  ],
  controllers: [...Object.values(Controllers)],
  providers: [
    {
      provide: CheckAddressDto,
      useClass: CheckAddressDtoConstraint,
    },
    ...Object.values(Services),
    ...Object.values(QueryHandlers),
  ],
})
export class AddressModule {}
