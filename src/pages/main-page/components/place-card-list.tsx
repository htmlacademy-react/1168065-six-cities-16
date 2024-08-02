import PlaceCard from '@src/components/place-card/place-card';
import type { Offer } from '@src/entities/offers';

type PlaceCardList = {
  offers: Offer[];
  setSelectedOffer: (offer: Offer | null) => void;
};

/**
 * Компонент списка карточек предложений по городам
 */
export default function PlaceCardList({
  offers,
  setSelectedOffer,
}: PlaceCardList) {
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((item) => (
        <PlaceCard
          key={item.id}
          bemblock="cities"
          imageSize={{ width: 260, height: 200 }}
          onMouseEnter={() => setSelectedOffer(item)}
          onMouseLeave={() => setSelectedOffer(null)}
          {...item}
        />
      ))}
    </div>
  );
}
