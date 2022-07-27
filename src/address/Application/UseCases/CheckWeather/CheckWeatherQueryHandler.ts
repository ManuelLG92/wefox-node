import {
  AppQueryHandler,
  AppQueryHandlerDecorator,
} from '../../../../shared/Application';
import { CheckWeatherQuery } from './CheckWeatherQuery';
import GeoCodeApp from '../../../Infrastructure/External/GeoCodeApp';
import WeatherApi, {
  WeatherResponseInterface,
} from '../../../Infrastructure/External/WeatherApi';
import { CacheService } from '../../../Services';

@AppQueryHandlerDecorator(CheckWeatherQuery)
export class CheckWeatherQueryHandler extends AppQueryHandler {
  constructor(private readonly cacheService: CacheService) {
    super();
  }
  async execute(query: CheckWeatherQuery): Promise<WeatherResponseInterface> {
    const { address } = query;

    const geoCode = await GeoCodeApp(address.transformToGoogleApiRequest());

    const { latitude, longitude } = geoCode;

    const cacheKey = `${latitude}-${longitude}`;

    const weatherCached = (await this.cacheService.getItem(
      cacheKey,
    )) as unknown as WeatherResponseInterface;

    if (weatherCached) {
      return weatherCached;
    }
    const weather = await WeatherApi({ latitude, longitude });

    await this.cacheService.setItem(cacheKey, { ...weather });

    return weather;
  }
}
