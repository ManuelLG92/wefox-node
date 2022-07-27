import { AddressGoogleApiPropertiesInterface } from '../../Domain/AddressGoogleApiProperties';
import { config } from 'dotenv';
import { Client, GeocodeResponse } from '@googlemaps/google-maps-services-js';
import { GeocodeResult } from '@googlemaps/google-maps-services-js/src/common';
import { WefoxNotFoundException } from '../../../shared/Domain/Services/Exceptions/WefoxNotFoundException';

config();

export interface GeoCodeResponseInterface {
  requestAddress: string;
  formattedAddress: string;
  latitude: number;
  longitude: number;
}

const GeoCodeApp = async ({
  address,
  country,
  zipcode,
}: AddressGoogleApiPropertiesInterface) => {
  const client = new Client({});
  const geocodeResponse = await client.geocode({
    params: {
      key: process.env.GEOCODER_PROVIDER_API_KEY,
      address,
      components: {
        country,
        postal_code: zipcode,
      },
    },
  });

  if (!geocodeResponse) {
    throw new WefoxNotFoundException(
      `Not found  address from your request: ${address}`,
    );
  }
  return formatAddress(address, geocodeResponse);
};

const formatAddress = (
  requestAddress: string,
  geocodeResponse: GeocodeResponse,
): GeoCodeResponseInterface => {
  const location = getFirstGeoCodeResult(geocodeResponse);

  if (!location) {
    throw new WefoxNotFoundException(
      `Not found location from address: ${requestAddress}`,
    );
  }

  const { geometry, formatted_address } = location;

  const { lat: latitude, lng: longitude } = geometry.location;

  return {
    requestAddress,
    formattedAddress: formatted_address,
    latitude,
    longitude,
  };
};

const getFirstGeoCodeResult = (
  geocodeResponse: GeocodeResponse,
): GeocodeResult | null => {
  return geocodeResponse.data.results?.length
    ? geocodeResponse.data.results[0]
    : null;
};

export default GeoCodeApp;
