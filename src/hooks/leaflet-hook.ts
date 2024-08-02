import type { Location } from '@src/entities/offers';
import { useEffect, useState, useRef, type RefObject } from 'react';
import leaflet from 'leaflet';

const URL_TEMPLATE =
  'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';
const tileLayerOptions = {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
};

export function useLeaflet(
  mapRef: RefObject<HTMLElement | null>,
  location: Location
) {
  const [map, setMap] = useState<leaflet.Map | null>(null);
  const isRenderedRef = useRef<boolean>(false);

  const { latitude, longitude, zoom } = location;

  useEffect(() => {
    if (mapRef.current !== null && !isRenderedRef.current) {
      const instance = leaflet.map(mapRef.current, {
        center: {
          lat: latitude,
          lng: longitude,
        },
        zoom: zoom,
      });

      leaflet.tileLayer(URL_TEMPLATE, tileLayerOptions).addTo(instance);

      setMap(instance);
      isRenderedRef.current = true;
    }
  }, [mapRef, location]);

  return map;
}
