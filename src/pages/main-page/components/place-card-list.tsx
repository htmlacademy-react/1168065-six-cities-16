import PlaceCard from '@src/components/place-card/place-card';
import { Place } from '@src/entities/offers';

type PlaceCardList = {
  places: Place[];
  setSelectedOffer: (id: string | null) => void;
};

/**
 * Компонент списка карточек предложений по городам
 */
export default function PlaceCardList({
  places,
  setSelectedOffer,
}: PlaceCardList) {
  return (
    <div className="cities__places-list places__list tabs__content">
      {places.map((item) => (
        <PlaceCard
          key={item.id}
          bemblock="cities"
          imageSize={{ width: 260, height: 200 }}
          onMouseEnter={() => setSelectedOffer(item.id)}
          onMouseLeave={() => setSelectedOffer(null)}
          {...item}
        />
      ))}
    </div>
  );
}
