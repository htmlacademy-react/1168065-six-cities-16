type RatingProps = {
  bemblock: string;
  rating: number;
  showValue?: boolean;
};

/**
 * Компонент звезд рейтинга
 */
export default function Rating({
  bemblock,
  rating,
  showValue = false,
}: RatingProps) {
  return (
    <div className={`${bemblock}__rating rating`}>
      <div className={`${bemblock}__stars rating__stars`}>
        {/* Количество звезд завязано на параметр width с шагом 20% */}
        <span style={{ width: `${Math.round(rating) * 20}%` }}></span>
        <span className="visually-hidden">Rating</span>
      </div>
      {/* Опциональное отображение рейтинга числом */}
      {showValue && (
        <span className={`${bemblock}__rating-value rating__value`}>
          {rating}
        </span>
      )}
    </div>
  );
}
