type RatingProps = {
  bemblock: string;
  rating: number;
};

/**
 * Компонент звезд рейтинга
 */
export default function Rating({ bemblock, rating }: RatingProps) {
  return (
    <div className={`${bemblock}__rating rating`}>
      <div className={`${bemblock}__stars rating__stars`}>
        {/* Количество звезд завязано на параметр width с шагом 20% */}
        <span style={{ width: `${Math.round(rating) * 20}%` }}></span>
        <span className="visually-hidden">Rating</span>
      </div>
    </div>
  );
}
