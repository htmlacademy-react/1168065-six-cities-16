import 'leaflet/dist/leaflet.css';
import type { Location, OfferForMap } from '@src/entities/offers';
import { useRef } from 'react';
import {
  useInitLeaflet,
  useRenderMarkers,
  useUpdateLocation,
} from '@src/hooks/leaflet-hooks';
import { layerGroup } from 'leaflet';

type MapProps = {
  bemblock: string;
  location: Location;
  offers: OfferForMap[];
  size?: {
    height: number | string;
    width?: number | string;
  };
};

/**
 * Компонент карты предложений
 */
export default function Map({
  bemblock,
  location,
  offers,
  size,
}: MapProps): JSX.Element {
  const mapRef = useRef(null);
  const layer = useRef(layerGroup());
  const map = useInitLeaflet(mapRef, location);

  useRenderMarkers(map, offers, layer);
  useUpdateLocation(map, location, layer);

  return (
    <section
      className={`${bemblock}__map map`}
      style={size}
      ref={mapRef}
    >
    </section>
  );
}
