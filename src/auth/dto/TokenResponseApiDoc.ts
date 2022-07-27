import { ApiProperty } from '@nestjs/swagger';

export class TokenResponseApiDoc {
  @ApiProperty({
    example: 'token-in-x-access-token-header',
    description: 'Set yout token in response header key: x-access-token',
  })
  accessToken: string;
}
