import { OfferDetailed } from '@src/entities/offers';

type GoodsProps = Pick<OfferDetailed, 'goods'>;

/**
 * Компонент доступных удобств
 */
export default function Goods({ goods }: GoodsProps) {
  return (
    <div className="offer__inside">
      <h2 className="offer__inside-title">What&apos;s inside</h2>
      <ul className="offer__inside-list">
        {goods.map((item) => (
          <li key={item} className="offer__inside-item">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
