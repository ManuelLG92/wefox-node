import {
  AppQueryHandler,
  AppQueryHandlerDecorator,
} from '../../../../shared/Application';
import { CheckAddressQuery } from './CheckAddressQuery';
import GeoCodeApp, {
  GeoCodeResponseInterface,
} from '../../../Infrastructure/External/GeoCodeApp';
import { CacheService } from '../../../Services';

@AppQueryHandlerDecorator(CheckAddressQuery)
export class CheckAddressQueryHandler extends AppQueryHandler {
  constructor(private readonly cacheService: CacheService) {
    super();
  }
  async execute(query: CheckAddressQuery): Promise<GeoCodeResponseInterface> {
    const { address } = query;
    const cacheKey = `${address.address()}-${address.postalCode.value()}`;

    const addressCached = await this.getCacheItem(cacheKey);

    if (addressCached) {
      return addressCached;
    }

    const geoCodeResponse = await GeoCodeApp(
      address.transformToGoogleApiRequest(),
    );

    await this.cacheService.setItem(cacheKey, { ...geoCodeResponse });

    return geoCodeResponse;
  }

  async getCacheItem(cacheKey: string): Promise<GeoCodeResponseInterface> {
    return (await this.cacheService.getItem(
      cacheKey,
    )) as unknown as GeoCodeResponseInterface;
  }
}
