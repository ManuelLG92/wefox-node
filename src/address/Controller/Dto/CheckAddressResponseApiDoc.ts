import { ApiProperty } from '@nestjs/swagger';

export class CheckAddressResponseApiDoc {
  @ApiProperty({
    example: '525 Avenida meridana Barcelona',
    description:
      'Composite address from request attributes: street number, street and town',
    required: true,
  })
  requestAddress: string;

  @ApiProperty({
    example: 'Avinguda Meridiana, 525, 08030 Barcelona, Spain',
    description: 'Google maps formatted address',
    required: true,
  })
  formattedAddress: string;

  @ApiProperty({
    example: 41.44403,
    description: 'Google maps address latitude',
    required: true,
  })
  latitude: number;

  @ApiProperty({
    example: 2.1859682,
    description: 'Google maps address longitude',
    required: true,
  })
  longitude: number;
}
