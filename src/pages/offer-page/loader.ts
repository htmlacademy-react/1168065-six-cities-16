import { AppRoute } from '@src/const';
import store from '@src/store';
import { fetchComments } from '@src/store/thunks/comments';
import { fetchOfferDetails, fetchNearbyOffers } from '@src/store/thunks/offer';
import { LoaderFunctionArgs, redirect } from 'react-router-dom';

export async function offerLoader({ params }: LoaderFunctionArgs) {
  const id = params.id!; // id будет всегда

  const offerData = store.dispatch(fetchOfferDetails(id)).unwrap();
  const commentsData = store.dispatch(fetchComments(id)).unwrap();
  const nearbyOffersData = store.dispatch(fetchNearbyOffers(id)).unwrap();

  return await Promise.allSettled([
    offerData,
    commentsData,
    nearbyOffersData,
  ]).then(([offer]) => {
    if (offer.status === 'rejected') {
      return redirect(AppRoute.NotFound);
    }

    return null;
  });
}
