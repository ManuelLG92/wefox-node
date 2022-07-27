import { ApiProperty } from '@nestjs/swagger';

export class CurrentWindApiDoc {
  @ApiProperty({
    example: 5,
    description: 'Wind speed',
    required: true,
  })
  speed: number;

  @ApiProperty({
    example: 130,
    description: 'Wind deg',
    required: true,
  })
  description: string;
}
