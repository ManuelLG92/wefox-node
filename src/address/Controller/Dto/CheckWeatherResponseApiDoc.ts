import { ApiProperty } from '@nestjs/swagger';
import { CurrentWeatherApiDoc } from './CurrentWeatherApiDoc';
import { CurrentWindApiDoc } from './CurrentWindApiDoc';

export class CheckWeatherResponseApiDoc {
  @ApiProperty({
    description: 'Weather',
    type: CurrentWeatherApiDoc,
  })
  weather: CurrentWeatherApiDoc[];

  @ApiProperty({
    example: 30.7,
    description: 'Temperature',
    required: true,
  })
  temperature: number;

  @ApiProperty({
    example: 32.4,
    description: 'Temperature sensation',
    required: true,
  })
  temperatureSensation: number;

  @ApiProperty({
    example: 23.3,
    description: 'Minimum Temperature',
    required: true,
  })
  minTemperature: number;

  @ApiProperty({
    example: 35.1,
    description: 'Maximum Temperature',
    required: true,
  })
  maxTemperature: number;

  @ApiProperty({
    example: 60,
    description: 'Humidity',
    required: true,
  })
  humidity: number;

  @ApiProperty({
    example: 1015,
    description: 'Pressure',
    required: true,
  })
  pressure: number;

  @ApiProperty({
    description: 'Wind',
    type: CurrentWindApiDoc,
  })
  wind: CurrentWindApiDoc;
}
