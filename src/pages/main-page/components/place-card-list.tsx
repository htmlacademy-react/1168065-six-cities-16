import PlaceCard from '@src/components/place-card/place-card';
import type { Offer } from '@src/entities/offers';
import { useAppDispatch } from '@src/hooks/store-hooks';
import { setActiveOffer } from '@src/store/slices/offers-slice';

type PlaceCardList = {
  offers: Offer[];
};

/**
 * Компонент списка карточек предложений по городам
 */
export default function PlaceCardList({ offers }: PlaceCardList) {
  const dispatch = useAppDispatch();

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((item) => (
        <PlaceCard
          key={item.id}
          bemblock="cities"
          imageSize={{ width: 260, height: 200 }}
          onMouseEnter={() => dispatch(setActiveOffer(item.id))}
          onMouseLeave={() => dispatch(setActiveOffer(null))}
          place={item}
        />
      ))}
    </div>
  );
}
