import type { Location, OfferForMap } from '@src/entities/offers';
import {
  useEffect,
  useState,
  useRef,
  type RefObject,
  MutableRefObject,
} from 'react';
import leaflet, { Marker, LayerGroup } from 'leaflet';
import { getActiveOffer } from '@src/store/slices/offers-slice';
import { useAppSelector } from './store-hooks';

const URL_TEMPLATE =
  'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';
const tileLayerOptions = {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
};

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

/**
 * Хук для инициализации Leaflet
 *
 * @param {RefObject<HTMLElement | null>} mapRef реф элемента, куда будет рендериться карта
 * @param {Location} location координаты места
 * @returns {leaflet.Map | null}
 */
export function useInitLeaflet(
  mapRef: RefObject<HTMLElement | null>,
  location: Location
): leaflet.Map | null {
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
  }, [mapRef, latitude, longitude, zoom]);

  return map;
}

/**
 * Хук для обновления локации (переключение между городами)
 * @param map инстанс карты leaflet
 * @param location координаты локации
 * @param layer слой leaflet
 */
export function useUpdateLocation(
  map: leaflet.Map | null,
  location: Location,
  layer: MutableRefObject<LayerGroup>
) {
  useEffect(() => {
    if (map && location) {
      layer.current?.addTo(map);
      map.panTo([location.latitude, location.longitude]);
    }
  }, [map, location, layer]);
}

/**
 * Хук для рендера маркеров на карте
 * @param map инстанс карты leaflet
 * @param offers массив объявлений по выбранной локации
 * @param layerRef ref со слоем карты
 */
export function useRenderMarkers(
  map: leaflet.Map | null,
  offers: OfferForMap[],
  layerRef: MutableRefObject<LayerGroup>
) {
  const activeOffer = useAppSelector(getActiveOffer);

  useEffect(() => {
    if (map === null) {
      return;
    }

    offers.forEach((offer) => {
      const marker = new Marker(
        {
          lat: offer.location.latitude,
          lng: offer.location.longitude,
        },
        {
          icon: activeOffer === offer.id ? activePinIcon : defaultPinIcon,
        }
      );

      marker.addTo(layerRef.current);
    });

    // записываем переданный слой во избежание мутации
    const savedLayer = layerRef.current;

    // очистка слоя при перерендере
    return () => {
      savedLayer.clearLayers();
    };
  }, [activeOffer, layerRef, map, offers]);
}
