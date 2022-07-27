import { ApiProperty } from '@nestjs/swagger';

export class FindUserDto {
  @ApiProperty({
    example: 'uuid',
    description: 'user uuid',
  })
  public readonly id: string;

  @ApiProperty({
    example: 'email@domain.es',
    description: 'Your registration email',
  })
  public readonly email: string;
}
