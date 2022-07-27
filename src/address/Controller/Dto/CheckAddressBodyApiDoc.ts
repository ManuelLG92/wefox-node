import { ApiProperty } from '@nestjs/swagger';
import { CheckAddressDto } from '../../Application/Request';
import { IsString, Length } from 'class-validator';
import AddressPropertiesInterface from '../../Domain/AddressPropertiesInterface';

export class CheckAddressBodyApiDoc implements CheckAddressDto {
  @ApiProperty({
    example: 'ES',
    description: 'iso code country',
    required: true,
  })
  @IsString()
  @Length(2, 3)
  public readonly [AddressPropertiesInterface.country]: string;

  @ApiProperty({
    example: '08016',
    description: 'Postal or zipcode',
    required: true,
  })
  @IsString()
  @Length(5, 10)
  public readonly [AddressPropertiesInterface.postalCode]: string;

  @ApiProperty({
    example: 'Avenida meridiana',
    description: 'Road type and name',
    required: true,
  })
  @IsString()
  @Length(1, 255)
  public readonly [AddressPropertiesInterface.street]: string;

  @ApiProperty({
    example: '525',
    description: 'Street number',
    required: true,
  })
  @IsString()
  @Length(1, 255)
  public readonly [AddressPropertiesInterface.streetNumber]: string;

  @ApiProperty({
    example: 'Barcelona',
    description: 'City name',
    required: true,
  })
  @IsString()
  @Length(1, 255)
  public readonly [AddressPropertiesInterface.town]: string;
}
