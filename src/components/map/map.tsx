type MapProps = {
  bemblock: string;
  size?: {
    height: number | string;
    width?: number | string;
  };
};

export default function Map({ bemblock, size }: MapProps): JSX.Element {
  return <section className={`${bemblock}__map map`} style={size}></section>;
}
