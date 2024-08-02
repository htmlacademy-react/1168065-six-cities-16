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
  active: Offer | null;
  bemblock: string;
  location: Location;
  offers: Offer[];
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
      map.panTo({ lat: location.latitude, lng: location.longitude });

      offers.forEach(({ id, location }) => {
        leaflet
          .marker(
            {
              lat: location.latitude,
              lng: location.longitude,
            },
            {
              icon: active?.id === id ? activePinIcon : defaultPinIcon,
            }
          )
          .addTo(map);
      });
    }
  }, [map, offers, active]);

  return (
    <section
      className={`${bemblock}__map map`}
      style={size}
      ref={mapRef}
    ></section>
  );
}
