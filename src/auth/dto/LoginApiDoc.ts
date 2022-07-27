import { ApiProperty } from '@nestjs/swagger';

export class LoginApiDoc {
  @ApiProperty({
    example: 'user@domain.ext',
    description: 'Specify your email to register',
    required: true,
  })
  email: string;

  @ApiProperty({
    example: '12345678',
    description: 'Set your password. Minimum 8 characters.',
    required: true,
  })
  password: string;
}
