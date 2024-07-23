import { OFFER_MAX_IMAGES } from '@src/const';
import { OfferDetailed } from '@src/entities/offers';

type GalleryProps = Pick<OfferDetailed, 'images'>;

export default function Gallery({ images }: GalleryProps) {
  return (
    <div className="offer__gallery-container container">
      <div className="offer__gallery">
        {images.slice(0, OFFER_MAX_IMAGES).map((item: string) => {
          return (
            <div key={item} className="offer__image-wrapper">
              <img className="offer__image" src={item} alt="Photo studio" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
