import { CheckAddressDto } from '../../Application/Request';
import { IsString, Length } from 'class-validator';

export class CheckAddressDtoConstraint implements CheckAddressDto {
  @IsString()
  @Length(2, 3)
  country: string;

  @IsString()
  @Length(5, 10)
  postalCode: string;

  @IsString()
  @Length(1, 255)
  street;

  @IsString()
  @Length(1, 255)
  streetNumber;

  @IsString()
  @Length(1, 255)
  town;
}
