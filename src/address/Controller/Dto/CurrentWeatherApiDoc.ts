import { ApiProperty } from '@nestjs/swagger';

export class CurrentWeatherApiDoc {
  @ApiProperty({
    example: 'Sunny',
    description: 'Weather',
    required: true,
  })
  main: string;

  @ApiProperty({
    example: 'Sunny',
    description: 'Weather Description',
    required: true,
  })
  description: string;
}
