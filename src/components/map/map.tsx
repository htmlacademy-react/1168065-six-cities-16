type MapProps = {
  bemblock: string;
};

export default function Map({ bemblock }: MapProps): JSX.Element {
  return <section className={`${bemblock}__map map`}></section>;
}
