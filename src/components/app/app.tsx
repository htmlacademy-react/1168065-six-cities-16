import MainPage from '@pages/main-page';

type AppProps = {
  placesAmount: number;
};

export default function App({ placesAmount }: AppProps): JSX.Element {
  return <MainPage placesAmount={placesAmount} />;
}
