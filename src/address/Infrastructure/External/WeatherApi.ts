import OpenWeatherMap from 'openweathermap-ts';
import { WefoxNotFoundException } from '../../../shared/Domain/Services/Exceptions/WefoxNotFoundException';

export interface CurrentWeather {
  main: string;
  description: string;
}
export interface WeatherResponseInterface {
  weather: CurrentWeather[];
  temperature: number;
  temperatureSensation: number;
  minTemperature: number;
  maxTemperature: number;
  humidity: number;
  pressure: number;
  wind: {
    speed: number;
    deg: number;
  };
}
const WeatherApi = async ({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}): Promise<WeatherResponseInterface> => {
  const openWeather = new OpenWeatherMap({
    apiKey: process.env.WEATHER_API_KEY,
  });

  openWeather.setUnits('metric');
  const currentWeather = await openWeather.getCurrentWeatherByGeoCoordinates(
    latitude,
    longitude,
  );

  if (!currentWeather) {
    throw new WefoxNotFoundException(
      `Not found weather from latitude: ${latitude} and longitude: ${latitude}`,
    );
  }

  const { weather, main, wind } = currentWeather;

  const transformCurrentWeather: CurrentWeather[] = weather?.map(
    ({ main, description }: { main: string; description: string }) => {
      return {
        main,
        description,
      };
    },
  );

  const {
    temp: temperature,
    feels_like: temperatureSensation,
    temp_min: minTemperature,
    temp_max: maxTemperature,
    humidity,
    pressure,
  } = main;

  return {
    weather: transformCurrentWeather,
    temperature,
    temperatureSensation,
    minTemperature,
    maxTemperature,
    humidity,
    pressure,
    wind,
  };
};

export default WeatherApi;
