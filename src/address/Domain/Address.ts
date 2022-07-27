import {
  CountryVO,
  PostalCodeVO,
  StreetNumberVO,
  StreetVO,
  TownVO,
} from './ValueObjects';
import { IdValueObject } from '../../shared/Domain/ValueObjects';
import { AggregateRoot } from '../../shared/Domain/Entity/AggregateRoot';
import AddressPropertiesInterface from './AddressPropertiesInterface';
import {
  AddressGoogleApiProperties,
  AddressGoogleApiPropertiesInterface,
} from './AddressGoogleApiProperties';
import { WithToPrimitivesInterface } from '../../shared/Domain/Entity/WithToPrimitivesInterface';

export class Address
  extends AggregateRoot
  implements WithToPrimitivesInterface
{
  constructor(
    public readonly id: IdValueObject,
    public readonly country: CountryVO,
    public readonly street: StreetVO,
    public readonly streetNumber: StreetNumberVO,
    public readonly town: TownVO,
    public readonly postalCode: PostalCodeVO,
  ) {
    super(id);
  }

  static create(
    country: CountryVO,
    street: StreetVO,
    streetNumber: StreetNumberVO,
    town: TownVO,
    postalCode: PostalCodeVO,
  ): Address {
    return new Address(
      IdValueObject.generate(),
      country,
      street,
      streetNumber,
      town,
      postalCode,
    );
  }

  toPrimitives(): Record<string, string> {
    return {
      [AddressPropertiesInterface.id]: this.id.value(),
      [AddressPropertiesInterface.country]: this.country.value(),
      [AddressPropertiesInterface.street]: this.street.value(),
      [AddressPropertiesInterface.streetNumber]: this.streetNumber.value(),
      [AddressPropertiesInterface.town]: this.town.value(),
      [AddressPropertiesInterface.postalCode]: this.postalCode.value(),
    };
  }

  static fromObject(addressObject: Record<string, string>): Address {
    return new Address(
      IdValueObject.create(
        addressObject[AddressPropertiesInterface.id] ??
          IdValueObject.generate().value(),
      ) as unknown as IdValueObject,
      CountryVO.create(
        addressObject[AddressPropertiesInterface.country] ?? '',
      ) as unknown as CountryVO,
      StreetVO.create(
        addressObject[AddressPropertiesInterface.street] ?? '',
      ) as unknown as StreetVO,
      StreetNumberVO.create(
        addressObject[AddressPropertiesInterface.streetNumber] ?? '',
      ) as unknown as StreetNumberVO,
      TownVO.create(
        addressObject[AddressPropertiesInterface.town] ?? '',
      ) as unknown as TownVO,
      PostalCodeVO.create(
        addressObject[AddressPropertiesInterface.postalCode] ?? '',
      ) as unknown as PostalCodeVO,
    );
  }

  address(): string {
    return `${this.streetNumber.value()} ${this.street.value()} ${this.town.value()}`;
  }

  transformToGoogleApiRequest(): AddressGoogleApiPropertiesInterface {
    return {
      [AddressGoogleApiProperties.address]: this.address(),
      [AddressGoogleApiProperties.country]: this.country.value(),
      [AddressGoogleApiProperties.zipcode]: this.postalCode.value(),
    };
  }
}
