import 'leaflet/dist/leaflet.css';
import type { Location, Offer } from '@src/entities/offers';
import { useEffect, useRef } from 'react';
import { useLeaflet } from '@src/hooks/leaflet-hook';
import leaflet from 'leaflet';

/**
 * иконка точки на карте
 */
const defaultPinIcon = leaflet.icon({
  iconUrl: '/img/pin.svg',
  iconSize: [27, 39],
  iconAnchor: [13.5, 39],
});

/**
 * иконка активной точки на карте
 */
const activePinIcon = leaflet.icon({
  iconUrl: '/img/pin-active.svg',
  iconSize: [27, 39],
  iconAnchor: [13.5, 39],
});

type MapProps = {
  active: Pick<Offer, 'id'> | null;
  bemblock: string;
  location: Location;
  offers: Pick<Offer, 'id' | 'location'>[];
  size?: {
    height: number | string;
    width?: number | string;
  };
};

/**
 * Компонент карты предложений
 */
export default function Map({
  active,
  bemblock,
  location,
  offers,
  size,
}: MapProps): JSX.Element {
  const mapRef = useRef(null);
  const map = useLeaflet(mapRef, location);

  useEffect(() => {
    if (map) {
      map.flyTo(
        { lat: location.latitude, lng: location.longitude },
        location.zoom
      );

      offers.forEach((offer) => {
        leaflet
          .marker(
            {
              lat: offer.location.latitude,
              lng: offer.location.longitude,
            },
            {
              icon: active?.id === offer.id ? activePinIcon : defaultPinIcon,
            }
          )
          .addTo(map);
      });
    }
  }, [map, offers, active, location]);

  return (
    <section
      className={`${bemblock}__map map`}
      style={size}
      ref={mapRef}
    ></section>
  );
}
