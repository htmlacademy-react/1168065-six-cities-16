import { OfferDetailed } from '@src/entities/offers';
import clsx from 'clsx';

type HostProps = Pick<OfferDetailed, 'host'>;

/**
 * Компонент хоста
 */
export default function Host({ host }: HostProps) {
  const hostAvatarClasses = clsx(
    'offer__avatar-wrapper user__avatar-wrapper',
    host.isPro && 'offer__avatar-wrapper--pro'
  );

  return (
    <div className="offer__host-user user">
      <div className={hostAvatarClasses}>
        <img
          className="offer__avatar user__avatar"
          src={host.avatarUrl}
          width="74"
          height="74"
          alt="Host avatar"
        />
      </div>
      <span className="offer__user-name">{host.name}</span>
      {host.isPro && <span className="offer__user-status">Pro</span>}
    </div>
  );
}
