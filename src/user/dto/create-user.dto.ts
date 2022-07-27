import { IsEmail, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'name@domain.ext',
    description: 'Email',
    required: true,
  })
  @IsString()
  @IsEmail()
  public readonly email: string;

  @ApiProperty({
    example: '12345698',
    description: 'password',
    required: true,
  })
  @IsString()
  @Length(8, 32)
  public readonly password: string;
}
