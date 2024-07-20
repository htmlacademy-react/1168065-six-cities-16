import PlaceCard from '@src/components/place-card/place-card';
import { Place } from '@src/entities/offers';
import { useState } from 'react';

type PlaceCardList = {
  places: Place[];
};

/**
 * Компонент списка карточек предложений по городам
 */
export default function PlaceCardList({ places }: PlaceCardList) {
  const [selectedCard, setSelectedCard] = useState(null);

  return (
    <div className="cities__places-list places__list tabs__content">
      {places.map((item) => (
        <PlaceCard key={item.id} setActiveCard={setSelectedCard} {...item} />
      ))}
    </div>
  );
}
