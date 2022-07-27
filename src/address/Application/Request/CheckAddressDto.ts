import AddressPropertiesInterface from '../../Domain/AddressPropertiesInterface';
import { IsString, Length } from 'class-validator';

export abstract class CheckAddressDto {
  @IsString()
  @Length(2, 3)
  public readonly [AddressPropertiesInterface.country]: string;
  @IsString()
  @Length(5, 10)
  public readonly [AddressPropertiesInterface.postalCode]: string;
  @IsString()
  @Length(1, 255)
  public readonly [AddressPropertiesInterface.street]: string;
  @IsString()
  @Length(1, 255)
  public readonly [AddressPropertiesInterface.streetNumber]: string;
  @IsString()
  @Length(1, 255)
  public readonly [AddressPropertiesInterface.town]: string;
}
